import React, { useState, useEffect } from 'react';
import PostCard from './components/PostCard/index'
import { checkCoordinatesDistance, getUserCoordinates, getImageDimensions } from './utils';

// Task 1: Form the photo/video layout based on the available resources from `props.data.resources` (Refer notion link)

// Task 2: Show the distance of the post from the user’s location
// 1. Create a custom hook to find user's location (ask for GPS permission)
// 2. Coordinates of each post is available in the `props.data.location` (Format:- coordinates:[longitude, latitude])
// 3. Supply both the latitude and longitude to checkCoordinatesDistance() util function to get the distance in kilometers

// These are hardcoded coordinates of Jaipur and Lucknow.
// const lat1 = 26.9124; // replace with user latitude
// const lon1 = 75.7873; // replace with user longitude
// const lat2 = 26.8467; // replace with post latitude
// const lon2 = 80.9462; // replace with post longitude
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
                            <PostCard.ImageContainer {...getImageDimensions(imageResources, index)}>
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
