import { Layout, Select, Space, Button , Modal , Drawer  } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoininfoModal'
import AddAssetForm from '../AddAssetForm'

const headerStyle = {
  backgroundColor: '#303030',
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
// const options = [
//   {
//     label: 'China',
//     value: 'china',
//     emoji: '🇨🇳',
//     desc: 'China (中国)',
//   },
//   {
//     label: 'USA',
//     value: 'usa',
//     emoji: '🇺🇸',
//     desc: 'USA (美国)',
//   },
//   {
//     label: 'Japan',
//     value: 'japan',
//     emoji: '🇯🇵',
//     desc: 'Japan (日本)',
//   },
//   {
//     label: 'Korea',
//     value: 'korea',
//     emoji: '🇰🇷',
//     desc: 'Korea (韩国)',
//   },
// ];

export default function AppHeader(){
 const [select, setSelect] = useState(false)
 const [modal, setModal] = useState(false)
 const [coin, setCoin] = useState(null)
 const [drawer ,setDrawer] = useState(false)
 
  const {crypto} =  useCrypto()
  useEffect(()=>{
    const keypress = (event) =>{
      if(event.key === '/'){
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () =>document.removeEventListener('keypress', keypress)
  },[])

  function handleSelect(value){
    setCoin(crypto.find(c => c.id === value))
    setModal(true)
  }
  return  (<Layout.Header style={headerStyle}>
   <Select
    style={{
      width: '250px',
    }}
    open={select}
    onSelect={handleSelect}
    onClick={()=>setSelect((prev)=> !prev)}
    value="press / to open"
    defaultValue={['bitcoin']}
    options={crypto.map(coin => ({
      label: coin.name,
      value: coin.id,
      icon: coin.icon,
    }))}
    optionRender={(option) => (
      <Space>
        <img style={{width: '20px'}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
      </Space>
    )}
  />
  <Button type="primary" onClick={()=> setDrawer(true)} >Add Asset</Button>
   <Modal footer={null} open={modal} onOk={()=>setModal(false)} onCancel={()=>setModal(false)}>
       <CoinInfoModal coin={coin}/>
      </Modal>
       <Drawer width={600} title="Add Asset" onClose={()=> setDrawer(false)} open={drawer} destroyOnClose>
      <AddAssetForm onClose={()=> setDrawer(false)}></AddAssetForm>
      </Drawer>
  </Layout.Header>)
}