import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  useWindowDimensions,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

// Responsive scaling functions
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const scale = (size) => (screenWidth / 375) * size; // Based on standard mobile width
const verticalScale = (size) => (screenHeight / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const onboardingData = [
  {
    id: 1,
    title: "Create Profile",
    description: "Lorem ipsum is placeradior tant commeriy vaeet in the grapitic, print, and publishing industries.",
    imageKey: "onboarding1",
    header: "Onboarding 1"
  },
  {
    id: 2,
    title: "Search for Matches",
    description: "Lorem ipsum is placeradior tant commeriy vaeet in the grapitic, print, and publishing industries.",
    imageKey: "onboarding2",
    header: "Onboarding 2"
  },
  {
    id: 3,
    title: "Send Interest & Connect",
    description: "Lorem ipsum is placeradior tant commeriy vaeet in the grapitic, print, and publishing industries.",
    imageKey: "onboarding3",
    header: "Onboarding 3"
  },
];

const Slide = ({ item, image, isSmallDevice, isTablet }) => (
  <View style={styles.slide}>
    <View style={[
      styles.imageContainer,
      isSmallDevice && styles.smallImageContainer,
      isTablet && styles.tabletImageContainer
    ]}>
      {image ? (
        <Image 
          source={image} 
          style={[
            styles.onboardingImage,
            isSmallDevice && styles.smallOnboardingImage,
            isTablet && styles.tabletOnboardingImage
          ]} 
          resizeMode="contain" 
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={[
            styles.placeholderText,
            isSmallDevice && styles.smallPlaceholderText
          ]}>Image</Text>
        </View>
      )}
    </View>
    <Text style={[
      styles.title,
      isSmallDevice && styles.smallTitle,
      isTablet && styles.tabletTitle
    ]}>{item.title}</Text>
    <Text style={[
      styles.description,
      isSmallDevice && styles.smallDescription,
      isTablet && styles.tabletDescription
    ]}>{item.description}</Text>
  </View>
);

const OnboardingScreen = ({ 
  onComplete, 
  images,
  onSkipToLogin
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { width, height } = useWindowDimensions();

  // Device classification
  const isSmallDevice = width < 360;
  const isMediumDevice = width >= 360 && width < 420;
  const isLargeDevice = width >= 420;
  const isTablet = width >= 768;
  const isLandscape = width > height;

  useEffect(() => {
    // Handle orientation changes
    if (isLandscape) {
      // Optional: Adjust layout for landscape if needed
    }
  }, [isLandscape]);

  const getCurrentImage = () => {
    return images ? images[onboardingData[currentSlide].imageKey] : null;
  };

  const goNext = () => {
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    console.log('Skip button clicked from slide:', currentSlide + 1);
    
    if (currentSlide === 0) {
      setCurrentSlide(1);
    } else if (currentSlide === 1) {
      setCurrentSlide(2);
    } else if (currentSlide === 2) {
      if (onSkipToLogin) {
        onSkipToLogin();
      } else {
        onComplete();
      }
    }
  };

  const isLastSlide = currentSlide === onboardingData.length - 1;

  return (
    <SafeAreaView style={[
      styles.container,
      isLandscape && styles.landscapeContainer
    ]}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#ffffff" 
        translucent={Platform.OS === 'android'}
      />
      
      {/* Header for Onboarding Screens */}
      <View style={[
        styles.onboardingHeader,
        isSmallDevice && styles.smallOnboardingHeader,
        isTablet && styles.tabletOnboardingHeader
      ]}>
        <Text style={[
          styles.onboardingHeaderTitle,
          isSmallDevice && styles.smallOnboardingHeaderTitle,
          isTablet && styles.tabletOnboardingHeaderTitle
        ]}>
          {onboardingData[currentSlide].header}
        </Text>
      </View>

      {/* Main Content */}
      <View style={[
        styles.sliderContainer,
        isLandscape && styles.landscapeSliderContainer
      ]}>
        <Slide 
          item={onboardingData[currentSlide]} 
          image={getCurrentImage()}
          isSmallDevice={isSmallDevice}
          isTablet={isTablet}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={[
        styles.bottomContainer,
        isSmallDevice && styles.smallBottomContainer,
        isTablet && styles.tabletBottomContainer,
        isLandscape && styles.landscapeBottomContainer
      ]}>
        {/* Skip Text - Left Side (No Button) */}
        <Text style={[
          styles.skipText,
          isSmallDevice && styles.smallSkipText,
          isTablet && styles.tabletSkipText
        ]}>
          Skip
        </Text>
        
        {/* Dots Indicator - Center */}
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                isSmallDevice && styles.smallDot,
                isTablet && styles.tabletDot,
                currentSlide === index && styles.activeDot,
                currentSlide === index && isSmallDevice && styles.smallActiveDot,
                currentSlide === index && isTablet && styles.tabletActiveDot
              ]}
            />
          ))}
        </View>

        {/* Next Button - Right Side (Arrow Icon) */}
        <TouchableOpacity 
          style={[
            styles.nextButton,
            isSmallDevice && styles.smallNextButton,
            isTablet && styles.tabletNextButton
          ]} 
          onPress={handleSkip} 
        >
           <Icon
            name="arrow-forward" 
            size={moderateScale(24)} 
            color="#fff"
            style={[
              styles.arrowIcon,
              isSmallDevice && styles.smallArrowIcon,
              isTablet && styles.tabletArrowIcon
            ]} 
          /> 
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  landscapeContainer: {
    // Landscape specific adjustments
  },

  // Header Styles
  onboardingHeader: {
    paddingTop: verticalScale(20),
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(10),
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  smallOnboardingHeader: {
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(8),
  },
  tabletOnboardingHeader: {
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(15),
  },
  onboardingHeaderTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#d0d0d0',
    textAlign: 'left ',
  },
  smallOnboardingHeaderTitle: {
    fontSize: moderateScale(16),
  },
  tabletOnboardingHeaderTitle: {
    fontSize: moderateScale(22),
  },

  // Slider Container
  sliderContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    paddingHorizontal: moderateScale(30),
  },
  landscapeSliderContainer: {
    paddingHorizontal: moderateScale(20),
  },

  // Slide Styles
  slide: { 
    alignItems: "center", 
    width: "100%" 
  },

  // Image Container
  imageContainer: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.4,
    borderRadius: moderateScale(20),
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(40),
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  smallImageContainer: {
    width: screenWidth * 0.90,
    height: screenHeight * 0.35,
    marginBottom: verticalScale(30),
    borderRadius: moderateScale(15),
  },
  tabletImageContainer: {
    width: screenWidth * 0.70,
    height: screenHeight * 0.45,
    marginBottom: verticalScale(50),
    borderRadius: moderateScale(25),
  },

  // Onboarding Image
  onboardingImage: { 
    width: "60%", 
    height: "60%" 
  },
  smallOnboardingImage: {
    width: "70%",
    height: "70%",
  },
  tabletOnboardingImage: {
    width: "50%",
    height: "50%",
  },

  // Placeholder
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: { 
    fontSize: moderateScale(18), 
    fontWeight: "bold", 
    color: "#666" 
  },
  smallPlaceholderText: {
    fontSize: moderateScale(16),
  },

  // Title
  title: { 
    fontSize: moderateScale(28), 
    fontWeight: "bold", 
    color: "#4d4d4d",
    marginBottom: verticalScale(20), 
    textAlign: "center" 
  },
  smallTitle: {
    fontSize: moderateScale(24),
    marginBottom: verticalScale(15),
  },
  tabletTitle: {
    fontSize: moderateScale(32),
    marginBottom: verticalScale(25),
  },

  // Description
  description: { 
    fontSize: moderateScale(16), 
    color: "#a8a8a8", 
    textAlign: "center", 
    lineHeight: moderateScale(24),
    paddingHorizontal: moderateScale(10),
  },
  smallDescription: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    paddingHorizontal: moderateScale(5),
  },
  tabletDescription: {
    fontSize: moderateScale(18),
    lineHeight: moderateScale(28),
    paddingHorizontal: moderateScale(20),
  },

  // Bottom Container
  bottomContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: moderateScale(30), 
    paddingBottom: verticalScale(50),
    paddingTop: verticalScale(20),
  },
  smallBottomContainer: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(40),
    paddingTop: verticalScale(15),
  },
  tabletBottomContainer: {
    paddingHorizontal: moderateScale(40),
    paddingBottom: verticalScale(60),
    paddingTop: verticalScale(30),
  },
  landscapeBottomContainer: {
    paddingBottom: verticalScale(30),
  },

  // Dots Container
  dotsContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center",
  },

  // Dots
  dot: { 
    width: moderateScale(10), 
    height: moderateScale(10), 
    borderRadius: moderateScale(5), 
    backgroundColor: "#ddd", 
    marginHorizontal: moderateScale(4),
  },
  smallDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    marginHorizontal: moderateScale(3),
  },
  tabletDot: {
    width: moderateScale(12),
    height: moderateScale(12),
    marginHorizontal: moderateScale(6),
  },
  activeDot: { 
    backgroundColor: "#22c55e",
    width: moderateScale(30),
  },
  smallActiveDot: {
    width: moderateScale(25),
  },
  tabletActiveDot: {
    width: moderateScale(40),
  },

  // Skip Text (Left Side - No Button)
  skipText: { 
    color: "#8d8d8d",
    fontSize: moderateScale(16), 
    fontWeight: "500",
    minWidth: moderateScale(80),
    textAlign: 'left',
  },
  smallSkipText: {
    fontSize: moderateScale(14),
    minWidth: moderateScale(70),
  },
  tabletSkipText: {
    fontSize: moderateScale(18),
    minWidth: moderateScale(100),
  },

  // Next Button (Right Side - Arrow Icon)
  nextButton: { 
    paddingVertical: verticalScale(12), 
    paddingHorizontal: moderateScale(20),
    backgroundColor: '#16a34a',
    borderRadius: moderateScale(25),
    minWidth: moderateScale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallNextButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(15),
    minWidth: moderateScale(50),
    borderRadius: moderateScale(20),
  },
  tabletNextButton: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(25),
    minWidth: moderateScale(80),
    borderRadius: moderateScale(30),
  },

  // Arrow Icon
  arrowIcon: {
    // Default icon styles
  },
  smallArrowIcon: {
    // Smaller device icon adjustments if needed
  },
  tabletArrowIcon: {
    // Tablet icon adjustments if needed
  },
});

export default OnboardingScreen;





 
// // #343434   create profile

// // #4d4d4d











// // #a8a8a8

// // #ededed

