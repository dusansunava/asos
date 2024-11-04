import { FC } from 'react';
import { Button } from './button';

interface TabProps {
  name: string;
  value: number;
  backgroundColor?: string;
}

const Tab: FC<TabProps> = ({ name, value, backgroundColor }) => {
    const defaultBackgroundColor = '#3182ce';
  
    return (
      
      <div
        className="p-4 mb-2"
        style={{
          backgroundColor: backgroundColor ? backgroundColor : defaultBackgroundColor,
          borderRadius: '0.5rem',
        }}
      > 
        <div className='flex'>
          <Button className="rounded-full w-10 h-10 lg:w-17 lg:h-17 text-lg">
            Icon
          </Button>
          <div className='ml-3 lg:ml-4 xl:ml-7'>
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-sm">{value}</div>
          </div>
        </div>
      </div>
    );
  };

export { Tab }