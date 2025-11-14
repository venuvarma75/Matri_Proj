import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  Platform,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const SplashScreen = ({onFinish, duration = 3000, backgroundImage}) => {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, duration);

    // Handle orientation changes
    const updateOrientation = () => {
      const {width: newWidth, height: newHeight} = Dimensions.get('window');
      setOrientation(newHeight >= newWidth ? 'portrait' : 'landscape');
    };

    const subscription = Dimensions.addEventListener(
      'change',
      updateOrientation,
    );

    return () => {
      clearTimeout(timer);
      subscription?.remove();
    };
  }, [onFinish, duration]);

  const isLandscape = orientation === 'landscape';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={true} // Hide status bar for full screen
        backgroundColor="#000000"
      />

      {/* Full Screen Background Image - Everything Visible */}
      {backgroundImage && (
        <View style={styles.imageWrapper}>
          <Image
            source={backgroundImage}
            style={[
              styles.backgroundImage,
              isLandscape && styles.landscapeBackground
            ]}
            resizeMode="contain" // Changed from "cover" to "contain"
          />
        </View>
      )}

      {/* Optional loading indicator */}
      <View style={styles.loadingContainer}>
        <View style={styles.loadingBar} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  landscapeBackground: {
    // No need to swap dimensions with "contain" resizeMode
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  loadingBar: {
    width: 120,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
});

export default SplashScreen;