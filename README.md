# react-native-checkbox
一个跨平台（iOS和Android）单和多项选择React Native组件。此组件基于react-native-multiple-choice
## 安装

```sh
npm install hinet/react-native-checkbox --save
```

## 使用

这里是组件使用的概述。

```jsx
<MultipleChoice
    options={[
    'Lorem ipsum dolor sit',
    'Lorem ipsum',
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    'Lorem ipsum dolor sit amet, consetetur',
    'Lorem ipsum dolor'
    ]}
    selectedOptions={['Lorem ipsum']}
    maxSelectedOptions={2}
    onSelection={(option)=>alert(option + ' was selected!')}
/>
```

## 属性

* `style - {}` custom style of the list
* `optionStyle - {}` custom style of the option element
* `options - []` required array of options
* `selectedOptions - []` optional array of initially selected options
* `maxSelectedOptions - int` optional maximum number of selectable options
* `onSelection - function(option){}` option selection callback
* `renderIndicator - function(option)` should return a selected/deselected indicator node, default: check mark image
* `renderSeparator - function(option)` should return a separator node that is displayed between the options, default: gray line
* `renderText - function(option)` should return a text node, default: text node
* `renderRow - function(option)` should return a option view
* `disabled - bool` if set to true component is disabled and can't be interacted with

## 截图

![example](https://github.com/hinet/react-native-checkbox/blob/master/assets/images/screenshot01.png)
![example](https://github.com/hinet/react-native-checkbox/blob/master/assets/images/screenshot02.png)



