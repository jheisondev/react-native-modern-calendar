# React Native Moder Calendar [![npm](https://img.shields.io/npm/v/react-native-date-picker.svg)](https://www.npmjs.com/package/react-native-modern-calendar) [ ![npm](https://img.shields.io/npm/dm/react-native-date-picker.svg)](https://www.npmjs.com/package/react-native-date-picker)

## Bem vindo ao react-native-modern-calendar

📱 O pacote é compatível com Android e iOS. <br>
💡 Este pacote usa React Hooks. Certifique-se de que está executando o react-native >= 0.59.0<br>
🖌  Por padrão, este pacote herda a família de fontes do seu projeto ('Sistema'). Você pode usar sua própria fonte personalizada, consulte as opções prop<br>
🕑 3 diferentes modos: Time, Date, DateTime <br>
🌍 Pt-br<br>
🎨 Customizável<br>

## Instalação

```yarn add react-native-modern-calendar```<br>```npm install react-native-modern-calendar```

## Simples

```jsx
import React, { useState } from 'react';
import DatePicker from 'react-native-modern-calendar';

const BasicUsage = () => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <DatePicker
      onSelectedChange={date => setSelectedDate(date)}
    />
  );
};
```

<iframe src="https://hosseinshabani.github.io/react-native-modern-datepicker/static/basic_usage-acfccf081c95a6f27a8080ec08108f3d.mp4" frameborder="0" style="border:none;" allowfullscreen="false" width="400" height="400"> </iframe>


## Personalizável

```jsx
import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

const FullUsageExample = () => {
  return (
    <DatePicker
      options={{
        backgroundColor: '#090C08',
        textHeaderColor: '#FFA25B',
        textDefaultColor: '#F6E7C1',
        selectedTextColor: '#fff',
        mainColor: '#F4722B',
        textSecondaryColor: '#D6C7A1',
        borderColor: 'rgba(122, 146, 165, 0.1)',
      }}
      current="2020-07-13"
      selected="2020-07-23"
      mode="calendar"
      minuteInterval={30}
      style={{ borderRadius: 10 }}
    />
  );
};
```

<img src="https://hosseinshabani.github.io/react-native-modern-datepicker/static/customization-example-a65669d3e177fb37100934f76d3b2a23.jpg" frameborder="0" style="border:none;" allowfullscreen="false" width="400" height="400" />


## Mínimo e Máximo

```jsx
import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

const MinMaxExample = () => {
  return (
    <DatePicker
      current="2020-07-13"
      minimumDate="2020-02-17"
      maximumDate="2020-07-25"
    />
  );
};
```

<iframe src="https://hosseinshabani.github.io/react-native-modern-datepicker/static/min_max-95478d668789c0d3c2cd96e4bd163d27.mp4" frameborder="0" style="border:none;" allowfullscreen="false" width="400" height="400"> </iframe>


## Horário 

```jsx
import React, { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';

const TimePickerExample = () => {
  const [time, setTime] = useState('');

  return (
    <DatePicker
      mode="time"
      minuteInterval={3}
      onTimeChange={selectedTime => setTime(selectedTime)}
    />
  );
};
```

<iframe src="https://hosseinshabani.github.io/react-native-modern-datepicker/static/timepicker-f3b34c8ce1d070ba551b48d8e03b9626.mp4" frameborder="0" style="border:none;" allowfullscreen="false" width="400" height="400"> </iframe>

