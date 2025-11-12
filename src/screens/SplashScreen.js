// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   Image,
//   Dimensions,
//   Platform,
// } from 'react-native';

// const {width, height} = Dimensions.get('window');

// const SplashScreen = ({onFinish, duration = 3000, backgroundImage}) => {
//   const [orientation, setOrientation] = useState('portrait');

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onFinish();
//     }, duration);

//     // Handle orientation changes
//     const updateOrientation = () => {
//       const {width: newWidth, height: newHeight} = Dimensions.get('window');
//       setOrientation(newHeight >= newWidth ? 'portrait' : 'landscape');
//     };

//     const subscription = Dimensions.addEventListener(
//       'change',
//       updateOrientation,
//     );

//     return () => {
//       clearTimeout(timer);
//       subscription?.remove();
//     };
//   }, [onFinish, duration]);

//   // Device classification for Android
//   const getDeviceType = () => {
//     if (width < 360) return 'small'; // Small phones: < 360px
//     if (width >= 360 && width < 420) return 'medium'; // Medium phones
//     if (width >= 420 && width < 768) return 'large'; // Large phones
//     return 'tablet'; // Tablets: >= 768px
//   };

//   const deviceType = getDeviceType();
//   const isLandscape = orientation === 'landscape';

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor="#ffffff"
//         translucent={Platform.OS === 'android'}
//       />

//       {/* Main content with responsive padding */}
//       <View
//         style={[
//           styles.content,
//           styles[`${deviceType}Content`],
//           isLandscape && styles.landscapeContent,
//         ]}>
//         {backgroundImage && (
//           <Image
//             source={backgroundImage}
//             style={[
//               styles.backgroundImage,
//               styles[`${deviceType}Image`],
//               isLandscape && styles.landscapeImage,
//             ]}
//             resizeMode={isLandscape ? 'contain' : 'cover'}
//           />
//         )}

//         {/* Optional loading indicator */}
//         <View
//           style={[
//             styles.loadingContainer,
//             isLandscape && styles.landscapeLoadingContainer,
//           ]}>
//           <View
//             style={[styles.loadingBar, styles[`${deviceType}LoadingBar`]]}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },

//   // Base content styles
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   // Device-specific content padding
//   smallContent: {
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//   },
//   mediumContent: {
//     paddingHorizontal: 15,
//     paddingVertical: 25,
//   },
//   largeContent: {
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   tabletContent: {
//     paddingHorizontal: 40,
//     paddingVertical: 50,
//   },

//   // Landscape adjustments
//   landscapeContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },

//   // Base background image
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },

//   // Small devices (Galaxy Fold, small Androids)
//   smallImage: {
//     // Keep full screen but ensure no important content is cut
//   },

//   // Medium devices (Pixel 3-5, most phones)
//   mediumImage: {
//     // Standard full screen
//   },

//   // Large devices (Pixel 6 Pro, Galaxy S22 Ultra)
//   largeImage: {
//     // May need slight adjustments for very tall screens
//   },

//   // Tablets
//   tabletImage: {
//     // Maintain aspect ratio better on large screens
//   },

//   // Landscape image adjustments
//   landscapeImage: {
//     width: '50%',
//     height: '50%',
//   },

//   // Loading indicator
//   loadingContainer: {
//     position: 'absolute',
//     bottom: 50,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   landscapeLoadingContainer: {
//     bottom: 20,
//   },

//   // Loading bar
//   loadingBar: {
//     height: 4,
//     backgroundColor: '#4a154b',
//     borderRadius: 2,
//   },
//   smallLoadingBar: {
//     width: 60,
//   },
//   mediumLoadingBar: {
//     width: 80,
//   },
//   largeLoadingBar: {
//     width: 100,
//   },
//   tabletLoadingBar: {
//     width: 120,
//     height: 6,
//   },
// });

// export default SplashScreen;


// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   Image,
//   Dimensions,
//   Platform,
// } from 'react-native';

// const {width, height} = Dimensions.get('window');

// const SplashScreen = ({onFinish, duration = 3000, backgroundImage}) => {
//   const [orientation, setOrientation] = useState('portrait');
//   const [imageAspectRatio, setImageAspectRatio] = useState(16/9); // Default aspect ratio

//   useEffect(() => {
//     // Get image dimensions to calculate proper aspect ratio
//     if (backgroundImage) {
//       const imageSource = Image.resolveAssetSource(backgroundImage);
//       if (imageSource && imageSource.width && imageSource.height) {
//         const ratio = imageSource.width / imageSource.height;
//         setImageAspectRatio(ratio);
//         console.log('📐 Image Aspect Ratio:', ratio, 'Dimensions:', imageSource.width, 'x', imageSource.height);
//       }
//     }

//     const timer = setTimeout(() => {
//       onFinish();
//     }, duration);

//     // Handle orientation changes
//     const updateOrientation = () => {
//       const {width: newWidth, height: newHeight} = Dimensions.get('window');
//       setOrientation(newHeight >= newWidth ? 'portrait' : 'landscape');
//     };

//     const subscription = Dimensions.addEventListener(
//       'change',
//       updateOrientation,
//     );

//     return () => {
//       clearTimeout(timer);
//       subscription?.remove();
//     };
//   }, [onFinish, duration, backgroundImage]);

//   // Device classification for Android
//   const getDeviceType = () => {
//     if (width < 360) return 'small'; // Small phones: < 360px
//     if (width >= 360 && width < 420) return 'medium'; // Medium phones
//     if (width >= 420 && width < 768) return 'large'; // Large phones
//     return 'tablet'; // Tablets: >= 768px
//   };

//   const deviceType = getDeviceType();
//   const isLandscape = orientation === 'landscape';

//   // Calculate optimal image dimensions based on device and orientation
//   const getImageDimensions = () => {
//     if (isLandscape) {
//       return {
//         width: width * 0.8, // 80% of screen width in landscape
//         height: (width * 0.8) / imageAspectRatio, // Maintain aspect ratio
//         maxWidth: width * 0.9,
//         maxHeight: height * 0.8,
//       };
//     }

//     // Portrait mode dimensions
//     switch (deviceType) {
//       case 'small':
//         return {
//           width: width * 0.95,
//           height: (width * 0.95) / imageAspectRatio,
//           maxHeight: height * 0.7,
//         };
//       case 'medium':
//         return {
//           width: width * 0.9,
//           height: (width * 0.9) / imageAspectRatio,
//           maxHeight: height * 0.75,
//         };
//       case 'large':
//         return {
//           width: width * 0.85,
//           height: (width * 0.85) / imageAspectRatio,
//           maxHeight: height * 0.8,
//         };
//       case 'tablet':
//         return {
//           width: Math.min(width * 0.8, 600),
//           height: Math.min((width * 0.8) / imageAspectRatio, 800),
//           maxHeight: height * 0.85,
//         };
//       default:
//         return {
//           width: width * 0.9,
//           height: (width * 0.9) / imageAspectRatio,
//           maxHeight: height * 0.8,
//         };
//     }
//   };

//   const imageDimensions = getImageDimensions();

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor="#ffffff"
//         translucent={Platform.OS === 'android'}
//       />

//       {/* Main content with responsive padding */}
//       <View
//         style={[
//           styles.content,
//           styles[`${deviceType}Content`],
//           isLandscape && styles.landscapeContent,
//         ]}>
//         {backgroundImage && (
//           <View style={[
//             styles.imageContainer,
//             isLandscape && styles.landscapeImageContainer
//           ]}>
//             <Image
//               source={backgroundImage}
//               style={[
//                 styles.backgroundImage,
//                 imageDimensions,
//                 styles[`${deviceType}Image`],
//                 isLandscape && styles.landscapeImage,
//               ]}
//               resizeMode="contain"
//             />
//           </View>
//         )}

//         {/* Optional loading indicator */}
//         <View
//           style={[
//             styles.loadingContainer,
//             isLandscape && styles.landscapeLoadingContainer,
//           ]}>
//           <View
//             style={[styles.loadingBar, styles[`${deviceType}LoadingBar`]]}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },

//   // Base content styles
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa', // Light fallback background
//   },

//   // Image container for better positioning
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 10,
//   },

//   // Device-specific content padding
//   smallContent: {
//     paddingHorizontal: 15,
//     paddingVertical: 20,
//   },
//   mediumContent: {
//     paddingHorizontal: 20,
//     paddingVertical: 25,
//   },
//   largeContent: {
//     paddingHorizontal: 25,
//     paddingVertical: 30,
//   },
//   tabletContent: {
//     paddingHorizontal: 40,
//     paddingVertical: 50,
//   },

//   // Landscape adjustments
//   landscapeContent: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   landscapeImageContainer: {
//     marginHorizontal: 20,
//   },

//   // Base background image
//   backgroundImage: {
//     borderRadius: 12,
//     // Dimensions are calculated dynamically
//   },

//   // Small devices (Galaxy Fold, small Androids)
//   smallImage: {
//     borderRadius: 8,
//   },

//   // Medium devices (Pixel 3-5, most phones)
//   mediumImage: {
//     borderRadius: 10,
//   },

//   // Large devices (Pixel 6 Pro, Galaxy S22 Ultra)
//   largeImage: {
//     borderRadius: 12,
//   },

//   // Tablets
//   tabletImage: {
//     borderRadius: 16,
//   },

//   // Landscape image adjustments
//   landscapeImage: {
//     borderRadius: 12,
//   },

//   // Loading indicator
//   loadingContainer: {
//     position: 'absolute',
//     bottom: 60,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     marginHorizontal: 40,
//     paddingVertical: 12,
//     borderRadius: 25,
//   },
//   landscapeLoadingContainer: {
//     bottom: 30,
//     marginHorizontal: 80,
//   },

//   // Loading bar
//   loadingBar: {
//     height: 4,
//     backgroundColor: '#4a154b',
//     borderRadius: 2,
//   },
//   smallLoadingBar: {
//     width: 80,
//   },
//   mediumLoadingBar: {
//     width: 100,
//   },
//   largeLoadingBar: {
//     width: 120,
//   },
//   tabletLoadingBar: {
//     width: 150,
//     height: 5,
//   },
// });

// export default SplashScreen;

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