import { useState } from 'react';
import { Button, Input, Icon, Menu, AutoComplete } from 'rainbowdesign';
export const BCustomComplete = (args) => {
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ];
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((player) => player.value.includes(query));
  };
  const renderOption = (item) => {
    const itemWithNumber = item;
    return (
      <>
        <b>名字: {itemWithNumber.value}</b>
        <span>球衣号码: {itemWithNumber.number}</span>
      </>
    );
  };
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder='输入湖人队球员英文,自定义下拉模版'
      renderOption={renderOption}
    />
  );
};
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <div>
        <Input />
        <Icon icon='adjust' size='2x' />
        <Menu defaultIndex='0'>
          <Menu.Item>cool link</Menu.Item>
          <Menu.Item>cool link 2</Menu.Item>
          <Menu.Item disabled>disabled</Menu.Item>
          <Menu.SubMenu title='下拉选项'>
            <Menu.Item>下拉选项一</Menu.Item>
            <Menu.Item>下拉选项二</Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <BCustomComplete />
      </div>
    </div>
  );
}

export default App;
