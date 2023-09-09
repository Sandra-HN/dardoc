import React, { useCallback, useEffect } from 'react';
import 'gantt-schedule-timeline-calendar/dist/style.css';

let GSTC, gstc, state;

async function initializeGSTC(element) {
  GSTC = (await import('gantt-schedule-timeline-calendar')).default;
  const TimelinePointer = (
    await import(
      'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js'
    )
  ).Plugin;
  const Selection = (
    await import(
      'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js'
    )
  ).Plugin;
  const ItemResizing = (
    await import(
      'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js'
    )
  ).Plugin;
  const ItemMovement = (
    await import(
      'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js'
    )
  ).Plugin;

  // helper functions

  function generateRows() {
    /**
     * @type { import("gantt-schedule-timeline-calendar").Rows }
     */
    const rows = {};
    for (let i = 0; i < 100; i++) {
      const id = GSTC.api.GSTCID(i.toString());
      rows[id] = {
        id,
        label: `Row ${i}`,
      };
    }
    return rows;
  }

  function generateItems() {
    /**
     * @type { import("gantt-schedule-timeline-calendar").Items }
     */
    const items = {};

    let start = GSTC.api.date().startOf('day').subtract(6, 'day');
    for (let i = 0; i < 100; i++) {
      const id = GSTC.api.GSTCID(i.toString());
      const rowId = GSTC.api.GSTCID(Math.floor(Math.random() * 100).toString());
      start = start.add(1, 'day');
      items[id] = {
        id,
        label: `Item ${i}`,
        rowId,
        time: {
          start: start.valueOf(),
          end: start.add(1, 'day').endOf('day').valueOf(),
        },
      };
    }
    return items;
  }

  /**
   * @type { import("gantt-schedule-timeline-calendar").Config }
   */
  const config = {
    licenseKey:
      '====BEGIN LICENSE KEY====\nSYOPzVqhzhq6wvDsHAdEdbn3xTmS98waF874BdOPT4qx4XwKZYkThje1M+If8YmUqdW3V4q2EXIhupd/xHVmg/GbipnNfCHMtskir6OOCXqV8mcmpk1BHG5e361KCGN5KFPZt3NxiCDB7V37bC0HhYbWra7lGi/Voc5+8W4zpDc4Oqm/l78/Rav5GbN/qWdGuWVk9ZM02/y+cIwntr/L4tzTI0fdW6Vg8dpUb3V2PRqEf591c17dlS0KFuhZWO9AlK/5yfZTYCQG7E8FhFYpg6NODgcyqtkbBmL3el3qKHhnJFlTXlPzR+t5qI3/nljsTQOO/3AyL3p7BsKfEyqqzw==||U2FsdGVkX19tJli0sfDkHeVSrDX7/6mXqhcXYp1VmiqZiiyJ3oZhr83WKaKixvom1Tduzd2ZRu4SSPibHx59Ycn+JJrugF1yizLaUM3s0rE=\np95SpT3mapKZi4qQDwcT5kIVaXsf1rW+9PaiobE5g0+IHGW1F42oGhg1mrKMUBaUDMTA1A+Zp6fjhQDZF1qa+0bpXXnytJDH1kXy0gPPt7tUwijK8imgCW61TRD9OcloQ7oo8MdeVSHlyXLjwqLTH8EtqnQvG2Swutl+4ORUG32vIL6eMOi+HDvNmkUTXj/gIrIrVj+mkGjzUQysppgyYoNFte3sUHtKq24U68M98Td5Cc56jYrWWy6pH8uV/9/3FliaOPhXvSb4Ye8dLTR7DmknUZSjGZw3UE0CE8+W6lm/da6h9sDWnIA8uuR+gafvw48+xcZ5gmzqxuE6BhxEmg==\n====END LICENSE KEY====',
    plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
    list: {
      columns: {
        data: {
          [GSTC.api.GSTCID('id')]: {
            id: GSTC.api.GSTCID('id'),
            width: 60,
            data: ({ row }) => GSTC.api.sourceID(row.id),
            header: {
              content: 'ID',
            },
          },
          [GSTC.api.GSTCID('label')]: {
            id: GSTC.api.GSTCID('label'),
            width: 200,
            data: 'label',
            header: {
              content: 'Label',
            },
          },
        },
      },
      rows: generateRows(),
    },
    chart: {
      items: generateItems(),
    },
  };

  state = GSTC.api.stateFromConfig(config);

  gstc = GSTC({
    element,
    state,
  });
}

export default function SchedulerSample() {
  const callback = useCallback((element) => {
    if (element) initializeGSTC(element);
  }, []);

  useEffect(() => {
    return () => {
      if (gstc) {
        gstc.destroy();
      }
    };
  });

  function updateFirstRow() {
    if (!GSTC || !state) return;
    state.update(`config.list.rows.${GSTC.api.GSTCID('0')}`, (row) => {
      row.label = 'Changed dynamically';
      return row;
    });
  }

  return (
    <div className="container">
      <button onClick={updateFirstRow}>Change row 1 label</button>
      <hr />
      <div id="gstc" ref={callback}></div>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
