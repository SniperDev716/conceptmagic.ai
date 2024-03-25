import React from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Welcome = () => {
  return (
    <div className="text-center w-screen mx-auto p-2 bg-black min-h-[calc(100vh_-_64px)]">
      <div className="max-w-6xl mx-auto pt-6">
        <Title level={2} className='!text-white'>How it works</Title>
        <img src="/imgs/how.png" alt="How it works" className='w-full' />
        <Link to="/projects"><Button type='primary' className='w-72 bg-white text-black' size='large'>Next</Button></Link>
      </div>
    </div>
  )
}

export default Welcome;