# React Native Moder Calendar 

## Bem vindo ao react-native-modern-calendar

📱 O pacote é compatível com Android e iOS. 

💡 Este pacote usa React Hooks. Certifique-se de que está executando o react-native >= 0.59.0

🖌  Por padrão, este pacote herda a família de fontes do seu projeto ('Sistema'). Você pode usar sua própria fonte personalizada, consulte as opções prop

🕑 3 diferentes modos: Time, Date, DateTime 

🌍 Pt-br

🎨 Customizável


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

