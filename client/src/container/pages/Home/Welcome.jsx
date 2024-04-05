import React, { useEffect } from 'react';
import { Button, Col, Image, Layout, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { setStorage } from '../../../helpers';

const { Title } = Typography;
const { Content } = Layout;

const Welcome = () => {

  useEffect(() => {
    setStorage('registered');
  }, []);

  return (
    <Content className="text-center w-screen mx-auto p-4 min-h-[calc(100vh_-_64px)]">
      <div className="max-w-5xl mx-auto pt-6">
        <h1 className='text-xl md:text-3xl mb-4'>What To Expect From <span className='text-purple-700'>Concept</span>!</h1>
        <h3 className='mb-4 max-w-4xl mx-auto'>Concept is designed to help you bring your ideas to life so you can visually see what a idea would look like in reality, and to continue to iterate to see where the creative gold is hidden.</h3>
        <h3 className='mb-6'>You should use this like a creative experimentation tool when you need new ideas.</h3>
        <Row className='p-5 rounded-2xl bg-gray-900' justify={"space-around"}>
          <Col xs={20} sm={10} md={8} lg={6}>
            <h2 className='mb-3 text-white'>Creativity is a <br /> Process.</h2>
            <Image src='/imgs/welcome0.png' width="100%" preview={false} alt='img1' />
            <p className='mt-4 text-white'>When creating creative concepts, it's hit-or-miss. So keep trying new ideas, not every image will be amazing.</p>
          </Col>
          <Col xs={20} sm={10} md={8} lg={6}>
            <h2 className='mb-3 text-white'>Perfect text is not possible with AI (yet).</h2>
            <Image src='/imgs/welcome1.png' width="100%" preview={false} alt='img1' />
            <p className='mt-4 text-white'>The AI gets text 90% correct, but sometimes it will miss a letter or spell things wrong. These images are designed to be inspiration.</p>
          </Col>
        </Row>
        <div className='mt-6'>
          <Link to="/projects"><Button type='primary' className='w-72 bg-purple-600 text-white' size='large'>Get Started</Button></Link>
        </div>
      </div>
    </Content>
  )
}

export default Welcome;