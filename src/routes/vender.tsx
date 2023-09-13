import { ConfigProvider, Layout, theme } from 'antd';
import { VenderTable } from '../components/VenderTable';
import { useState } from 'react';
import { Producto } from '../types';
import SelectedProductoItem from '../components/Vender/SelectedProductoItem';

const { Header, Sider, Footer, Content } = Layout;
export function Vender() {
  const [selectedList, setSelectedList] = useState([] as Producto[]);
  const [venderMenuClosed, setVenderMenuClosed] = useState(false);
  return (
    <div className="flex flex-col items-center space-y-4 ">
      <Layout style={{ width: '100%' }}>
        <Header style={{ backgroundColor: 'white' }}>
          <h1 className="text-5xl">Vender</h1>
        </Header>
        <Layout hasSider>
        <Content style={{ backgroundColor: 'red' }}>
          <VenderTable
            onProductoSelected={(producto) => {
              console.log(producto);
            }}
          />
        </Content>
          <Sider
            collapsible
            collapsed={venderMenuClosed}
            collapsedWidth={0}
            width={500}
            trigger={null}
            style={{ backgroundColor: 'green',  }}>
              <SelectedProductoItem/>
          </Sider>
        </Layout>
      </Layout>
    </div>
  );
}
