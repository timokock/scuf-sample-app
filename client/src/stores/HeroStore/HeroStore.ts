import { observable } from 'mobx';
import { ICarouselImage, IAccordionContent } from './IHeroStore';

export default class HeroStore {

    @observable
    public carouselImage: Array<ICarouselImage> = [
        {
            image: 'https://cdn-images-1.medium.com/max/2000/1*8rvPWNdicdxXTKuD3uEOig.jpeg',
            title: 'Call To Action 1',
            content: 'Detail 1',
            buttonText: 'Button 1'
        },
        {
            image: 'http://paperlief.com/images/guardians-of-the-galaxy-official-poster-wallpaper-3.jpg',
            title: 'Call To Action 2',
            content: 'Detail 2',
            theme: 'dark'
        }
    ];

    @observable
    public accordionContent: Array<IAccordionContent> = [
        {
            title: 'Star Lord',
            content: 'Star-Lord (Peter Quill) is a fictional superhero appearing in American comic books published by Marvel Comics. The character, created by Steve Englehart and Steve Gan, first appeared in Marvel Preview #4 (January 1976). The son of human Meredith Quill and Spartoi J\'son, Peter Quill assumes the mantle of Star-Lord, an interplanetary policeman.'
        },
        {
            title: 'Gamora',
            content: 'Gamora Zen Whoberi Ben Titan (/ɡəˈmɔːrə/) is a fictional character appearing in American comic books published by Marvel Comics. Created by Jim Starlin, the character first appeared in Strange Tales #180 (June 1975). Gamora is the adopted daughter of Thanos, and the last of her species. Her powers include superhuman strength and agility and an accelerated healing factor. She also is an elite combatant, being able to beat most of the opponents in the galaxy. She is a member of the group known as the Infinity Watch. The character played a role in the 2007 crossover comic book event "Annihilation: Conquest", and became a member of the titular team in its spin-off comic, Guardians of the Galaxy.'
        },
        {
            title: 'Rocket Raccoon',
            content: 'Rocket Raccoon is a fictional character appearing in American comic books published by Marvel Comics. Created by writer Bill Mantlo and artist Keith Giffen, the character first appeared in Marvel Preview #7 (Summer 1976). He is an intelligent, anthropomorphic raccoon, who is an expert marksman and master tactician. His name and aspects of his character are a nod to The Beatles\' 1968 song "Rocky Raccoon".'
        },
        {
            title: 'Groot',
            content: 'Groot (/ɡruːt/) is a fictional superhero appearing in American comic books published by Marvel Comics. Created by Stan Lee, Jack Kirby, Larry Lieber and Dick Ayers, the character first appeared in Tales to Astonish #13 (November 1960). An extraterrestrial, sentient tree-like creature, the original Groot first appeared as an invader that intended to capture humans for experimentation'
        },
        {
            title: 'Drax the Destroyer',
            content: 'Drax the Destroyer (Arthur Douglas) is a fictional character appearing in American comic books published by Marvel Comics. Created by writer/artist Jim Starlin, the character first appeared in The Invincible Iron Man #55 (February 1973).'
        }
    ];
} 