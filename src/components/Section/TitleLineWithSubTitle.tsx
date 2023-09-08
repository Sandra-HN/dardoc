import { ReactNode } from 'react';
import Icon from '../Icon';
import IconRounded from '../Icon/Rounded';

type Props = {
  icon?: string;
  title: string;
  subtitle: string;
  main?: boolean;
  showCog?: boolean;
  children?: ReactNode;
};

export default function TitleLineWithSubTitle({
  icon,
  title,
  subtitle,
  main = false,
}: Props) {
  return (
    <section
      className={`${
        main ? '' : 'pt-6'
      } mb-6 block items-center justify-between`}
    >
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center justify-start">
          {icon && main && (
            <IconRounded icon={icon} color="light" className="mr-3" bg />
          )}
          {icon && !main && <Icon path={icon} className="mr-2" size="20" />}
          <h1 className={`leading-tight ${main ? 'text-3xl' : 'text-2xl'}`}>
            {title}
          </h1>
        </div>
        <p className="mt-1 text-sm text-gray-500 w-full">{subtitle}</p>
      </div>
    </section>
  );
}
