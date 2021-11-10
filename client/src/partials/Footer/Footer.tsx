import * as React from 'react';
import { Footer } from '@scuf/common';

export default class AppFooter extends React.Component {
    render() {
        return (
            <Footer>
                <Footer.Item>Terms & Conditions</Footer.Item>
                <Footer.Item>Privacy Policy</Footer.Item>    
            </Footer>
        );
    }
}