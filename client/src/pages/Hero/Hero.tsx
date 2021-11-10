import * as React from 'react';
import { Grid, Carousel, Icon, Accordion } from '@scuf/common';
import { ICarouselImage, IAccordionContent } from 'stores/HeroStore/IHeroStore';
import HeroStore from 'stores/HeroStore/HeroStore';
import { inject, observer } from 'mobx-react';
import ListHeader from '../../partials/ListHeader/ListHeader';
type Props = { heroStore?: HeroStore };

@observer
export class HeroPage extends React.Component<Props> {
    render() {
        const store = this.props.heroStore!;
        return (
            <section>
                <Grid className="main-body">
                    <ListHeader
                        title="Guardians of the Galaxy"
                        description="Guardians of the Galaxy is a 2014 American superhero film based on the Marvel Comics superhero team of the same name, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the tenth film in the Marvel Cinematic Universe (MCU)."
                    />
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Carousel autoPlay={true} transitionTime={6000} height={500}>
                                {store.carouselImage.map((slide, index) => this.genCarousel(slide, index))}
                            </Carousel>
                        </Grid.Column>
                    </Grid.Row>
                </Grid >
                <Grid className="contact">
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <span className="contact-buttons">
                                <Icon name="users" />
                                <br />
                                Crew
                            </span>
                            <span className="contact-buttons">
                                <Icon root="aero" name="ac-glider" />
                                <br />
                                Ship
                            </span>
                            <span className="contact-buttons">
                                <Icon name="location" />
                                <br />
                                Locate
                            </span>
                        </Grid.Column>
                        <Grid.Column width={1}><div className="separator" /></Grid.Column>
                        <Grid.Column width={7} className="contact-text">
                            <div>
                                <h4>Contact Us</h4>
                                <p>Get in touch with us to know about our latest adventures. We have (had) Infinity Stones that can bring a lot of value for a lot of planets.</p>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <h3>Crew</h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Accordion >
                                {store.accordionContent.map((accordionContent, index) => this.genAccordion(accordionContent, index))}
                            </Accordion>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </section>
        );
    }

    private genCarousel(slide: ICarouselImage, index: number) {
        return (
            <Carousel.Slide
                image={slide.image}
                key={index}
                title={slide.title}
                content={slide.content}
                buttonText={slide.buttonText}
                clickAction={slide.clickAction}
            />
        );
    }

    private genAccordion(accordionContent: IAccordionContent, index: number) {
        return (
            <Accordion.Content title={accordionContent.title} key={index}>
                {accordionContent.content}
            </Accordion.Content>
        );
    }
}
export default inject('heroStore')(HeroPage);