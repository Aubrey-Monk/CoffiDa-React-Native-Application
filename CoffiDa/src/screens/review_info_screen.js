import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, ActivityIndicator} from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LikeReview from '../components/like_review';
import UserInfo from '../components/user_information';
import GetPhoto from '../components/get_photo';
import globalStyles from '../styles/global_stylesheet';

const ReviewInfoScreen = (props) => {
  const {route} = props;
  const {params} = route;
  const {reviewData} = params;
  const {id} = params;

  const [photo, setPhoto] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [isMine, setIsMine] = useState(false);

  const [liked, setLiked] = useState(false);

  const onLikedClick = async () => {
    isFavourited();
    if (liked) {
      await LikeReview(id, reviewData.review_id, 'DELETE');
      setLiked(!liked);
    } else if (!liked) {
      await LikeReview(id, reviewData.review_id, 'POST');
      setLiked(!liked);
    }
  };

  const isFavourited = useCallback(async () => {
    const data = await UserInfo();

    const arrLocationID = data.liked_reviews.map((i) => i.location.location_id);

    const arrReviewID = data.liked_reviews.map((j) => j.review.review_id);

    const reviewIndex = arrReviewID.indexOf(reviewData.review_id);

    if (reviewIndex !== -1 && arrLocationID[reviewIndex] === id) {
      setLiked(true);
    } else {
      setLiked(false);
    }

    setIsLoading(false);
  }, [id, reviewData]);

  const isMyReview = useCallback(async () => {
    const data = await UserInfo();

    const arrLocationID = data.reviews.map((i) => i.location.location_id);

    const arrReviewID = data.reviews.map((j) => j.review.review_id);

    const reviewIndex = arrReviewID.indexOf(reviewData.review_id);

    if (reviewIndex !== -1 && arrLocationID[reviewIndex] === id) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, [id, reviewData]);

  // console.log(isMine);

  useEffect(() => {
    async function getReviewPhoto() {
      const data = await GetPhoto(id, reviewData.review_id);
      setPhoto(data);
    }

    getReviewPhoto();
    isMyReview();
    isFavourited();
  }, [isFavourited, id, reviewData, isMyReview]);

  if (isLoading === true) {
    return (
      <View style={globalStyles.flexContainer}>
        <ActivityIndicator style={globalStyles.activityIndicator} animating />
      </View>
    );
  }
  return (
    <View>
      <Image
        source={{uri: photo.url}}
        style={{width: 75, height: 75, borderRadius: 37.5}}
      />
      <Button mode="contained" style={styles.button} onPress={onLikedClick}>
        <Icon name={liked ? 'heart' : 'heart-outline'} size={40} color="red" />
      </Button>
    </View>
  );
};

ReviewInfoScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      reviewData: PropTypes.objectOf(PropTypes.any),
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({});

export default ReviewInfoScreen;