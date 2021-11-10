
import * as React from 'react';
import {  shallow } from 'enzyme';

import { HeroPage } from './Hero';
import { Carousel } from '@scuf/common';
import Accordion from '@scuf/common/dist/components/Accordion/Accordion';


describe('<HeroPage />', () => {
    let heroStore = {
        carouselImage: [{ image: 'test.jpg', title: 'test title', content: 'Detail 1', buttonText: 'Button 1'}],
        accordionContent: [{ title: 'test title', content: 'test content'}]
    };
    
    it('renders without crashing', () => {
        shallow(<HeroPage heroStore={heroStore} />);
    });

    describe('render functions', () => {
        it('has a genCarousel function that outputs correct output', () => {
            const wrapper = shallow(<HeroPage heroStore={heroStore} />);
            expect(wrapper.find(Carousel.Slide)).toHaveLength(heroStore.carouselImage.length);
        });

        it('has a genAccordion function that outputs correct output', () => {
            const wrapper = shallow(<HeroPage heroStore={heroStore} />);
            expect(wrapper.find(Accordion.Content)).toHaveLength(heroStore.accordionContent.length);
        });
    });
});