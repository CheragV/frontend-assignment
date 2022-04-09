import React, { useState, useEffect } from 'react';
import PostCard from './components/PostCard/index'
import { checkCoordinatesDistance, getUserCoordinates, getImageDimensions } from './utils';

export default function Post(props) {
    const [lat1, setLat1] = useState(null);
    const [lon1, setLon1] = useState(null);

    useEffect(() => {
        /** Setting up callback to respond when location is loaded */
        getUserCoordinates(({ lat1, lon1 }) => {
            setLat1(lat1);
            setLon1(lon1);
        });
    }, []);

    const [lat2, lon2] = JSON.parse(props?.data?.location)?.coordinates;
    const distance = lat1 === null || lon1 === null ? null : checkCoordinatesDistance(lat1, lon1, lat2, lon2);
    const milk = props.data.highestMilk ? props.data.highestMilk : props.data.currentMilk;
    const tel = `tel:${props.data.contact}`;

    const imageResources = props.data.resources.slice(0, 4); // excluding cases where we might have more than 4 images

    return (
        <PostCard>
            <PostCard.Resources>
                <PostCard.ImageGroup>
                    {
                        imageResources.map((image, index) => (
                            <PostCard.ImageContainer {...getImageDimensions(imageResources, index)} key={JSON.parse(image).url}>
                                <PostCard.Image src={JSON.parse(image).url} resource={JSON.parse(image).url} />
                            </PostCard.ImageContainer>
                        ))
                    }
                </PostCard.ImageGroup>
            </PostCard.Resources>
            <PostCard.Group>
                {distance ? <PostCard.Date>
                    <span className="bolded">{`${parseInt(distance)} KM`}</span> from your location
                </PostCard.Date> : <span>...</span>}
                <PostCard.Location>
                    {props.data.locationName.split(',')[0]}, {props.data.locationName.split(',')[1]}
                </PostCard.Location>
            </PostCard.Group>
            <PostCard.Group padding='20'>
                <PostCard.PostHeading>
                    {`${props.data.breed} ${props.data.animalType}`}
                </PostCard.PostHeading>
                <PostCard.Price>
                    {`Rs. ${props.data.price}`}
                </PostCard.Price>
            </PostCard.Group>
            <PostCard.PostDescription>{`This is a ${props.data.gender} ${props.data.breed} ${props.data.animalType} which can provide upto ${milk} litres of milk on a daily basis `}</PostCard.PostDescription>
            <PostCard.Group padding="30">
                <PostCard.PostHeading>
                    {props.data.seller}
                </PostCard.PostHeading>
                <PostCard.CallButton href={tel} src="https://static-assets.animall.in/static/images/call-card.png">
                </PostCard.CallButton>
            </PostCard.Group>
        </PostCard>
    )
}
