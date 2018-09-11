import React from 'react';
import { Text, View, Image } from 'react-native';
import { Card, CardSection, Button } from './common/';

const AlbumDetail = ({ album }) => {
  const { title, artist, thumbnail_image, image } = album;

  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle
   } = styles;

  return (
    <Card>
        <CardSection>
          <View style={thumbnailContainerStyle}>
              <Image
                source={{ uri: thumbnail_image }}
                style={thumbnailStyle}
              />
          </View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{title}</Text>
            <Text>{artist}</Text>
          </View>
        </CardSection>
        <CardSection>
          <Image
            source={{ uri: image }}
            style={imageStyle}
          />
        </CardSection>
        <CardSection>
          <Button
            onPress={() => console.log("micliccasti")}
          />
        </CardSection>
    </Card>
  );
};


const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  headerTextStyle: {
    fontSize: 18,
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default AlbumDetail;
