import { Layout, Card, Statistic , List,Typography, Tag} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';

import {capitalize, } from '../utils'
import CryptoContext from '../../context/crypto-context';

const siderStyle = {
  backgroundColor: '#ebf2fa',
  padding: '1rem',
};

export default function AppSider(){
  const { assets} = useContext(CryptoContext)
 
  return (  <Layout.Sider width="25%" style={siderStyle}>
    {assets.map(asset =>(
    <Card key={asset.id} style={{backgroundColor:'white', marginBottom: '1rem'}}>
      <Statistic
      
      title={capitalize(asset.id)}
        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        suffix="$"
        value={asset.totalAmount}
        precision={2}
          valueStyle={{
            color: asset.grow ? '#3f8600' : '#cf1322',
          }}>
            </Statistic>

            <List
            
            size='small'
            bordered
            dataSource={[
              {title: 'Total Profit', value: asset.totalProfit, withTag: true,},
              {title: 'Asset Amount', value: asset.amount, IsPlain: true},
              // {title: 'Difference', value: asset.growPercent},
            ]

            }
            renderItem={(item) => (
<List.Item >
          <span>{item.title}</span>
          <span>
            {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
          {item.IsPlain && item.value}
          {!item.IsPlain && <Typography.Text type={asset.grow? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
          </span>
          
</List.Item>
      )}
    /></Card>
    ))}
        </Layout.Sider>)
}