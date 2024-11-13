import * as React from 'react';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useState } from 'react';

export default function ClockTimePicker() {
  const [time, setTime] = useState(dayjs('2022-04-17T15:30')); // Set initial default value

  const handleTimeChange = (newTime) => {
    setTime(newTime); // Set the selected time
    console.log("Selected Time:", newTime.format('YYYY-MM-DDTHH:mm:ss.SSSZ')); // Log time in the same format
  };

  return (
    <div className="mb-2">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoItem>
          <MobileTimePicker 
            value={time} 
            onChange={handleTimeChange} 
            defaultValue={dayjs('2022-04-17T15:30:53.419+00:00')} 
          
          />
        </DemoItem>
      </LocalizationProvider>
    </div>
  );
}
