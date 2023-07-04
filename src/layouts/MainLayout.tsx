import { Layout } from 'antd';
import { FC } from 'react';
import { SearchOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;

interface HeaderProps {
  children: React.ReactNode;
}

export const MainLayout: FC<HeaderProps> = ({ children }) => {
  return (
    <Layout className="h-full min-h-screen overflow-auto">
      <Layout>
        <Header className='px-5' style={{background: '#549F93' }}>
          <div className='flex items-center gap-2'>
            <SearchOutlined className='text-white text-[30px]' />
            <h1 className='text-white text-[32px]'>RecipeFinder</h1>
          </div>
        </Header>
        <Content
          className="flex justify-center"
          style={{
            padding: 24,
            minHeight: 280,
            background: 'white',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
