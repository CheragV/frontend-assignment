import {
    CallButton,
    CallButtonImage,
    Container,
    Date,
    Group,
    Image,
    Location,
    PostDescription,
    PostHeading,
    Price,
    Resources,
    ImageGroup,
    ImageContainer
} from './styles/post';

export default function PostCard({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>
}

PostCard.PostHeading = function PostCardPostHeading({ children, ...restProps }) {
    return <PostHeading {...restProps}>{children}</PostHeading>
}

PostCard.Resources = function PostCardResources({ children, ...restProps }) {
    return <Resources {...restProps}>{children}</Resources>
}

PostCard.ImageContainer = function PostCardImageContainer({ children, resource, ...restProps }) {
    return <ImageContainer {...restProps}>{children}</ImageContainer>
}

PostCard.ImageGroup = function PostCardImageGroup({ children, resource, ...restProps }) {
    return <ImageGroup {...restProps}>{children}</ImageGroup>
}

PostCard.Image = function PostCardImage({ children, resource, ...restProps }) {
    return <Image {...restProps} loading="lazy" alt="..." >{children}</Image>
}

PostCard.PostDescription = function PostCardPostDescription({ children, ...restProps }) {
    return <PostDescription {...restProps}>{children}</PostDescription>
}
PostCard.Group = function PostCardGroup({ children, ...restProps }) {
    return <Group {...restProps}>{children}</Group>
}
PostCard.Price = function PostCardPrice({ children, ...restProps }) {
    return <Price {...restProps}>{children}</Price>
}
PostCard.CallButtonImage = function PostCardCallButtonImage({ children, ...restProps }) {
    return <CallButtonImage {...restProps}>{children}</CallButtonImage>
}
PostCard.CallButton = function PostCardCallButton({ children, src, ...restProps }) {
    return <CallButton {...restProps} target="_blank" rel="noopener noreferrer" aria-label='Call'><CallButtonImage src={src} alt="Call" /></CallButton>
}
PostCard.Date = function PostCardDate({ children, ...restProps }) {
    return <Date {...restProps}>{children}</Date>
}
PostCard.Location = function PostCardLocation({ children, ...restProps }) {
    return <Location {...restProps}>{children}</Location>
}
