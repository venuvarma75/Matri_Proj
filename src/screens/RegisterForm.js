// #d6d6d6 box 
//  #bcbcbc text 
//  box middle white 
// #ffffff box middle white 





// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
//   ImageBackground,
//   Alert,
//   Dimensions,
//   useWindowDimensions,
// } from "react-native";

// const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// // Responsive scaling functions
// const scale = (size) => (screenWidth / 375) * size;
// const verticalScale = (size) => (screenHeight / 812) * size;
// const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// const RegisterForm = ({ onRegister, backgroundImage, onNavigateToLogin, onNavigateToBasicDetails }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     mobileNumber: "",
//     password: "",
//     selectedProfile: "Myself",
//   });

//   const { width, height } = useWindowDimensions();

//   // Device classification
//   const isSmallDevice = width < 360;
//   const isTablet = width >= 768;
//   const isLandscape = width > height;

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleRegisterNow = () => {
//     if (!formData.fullName || !formData.mobileNumber || !formData.password) {
//       Alert.alert(
//         "Registration Failed",
//         "Please fill in all fields",
//         [{ text: "OK", style: "default" }]
//       );
//       return;
//     }

//     if (onNavigateToBasicDetails) {
//       onNavigateToBasicDetails(formData);
//     }
//   };

//   const handleNavigateToLogin = () => {
//     if (onNavigateToLogin) {
//       onNavigateToLogin();
//     }
//   };

//   return (
//     <SafeAreaView style={[
//       styles.safeArea,
//       isLandscape && styles.landscapeSafeArea
//     ]}>
//       <StatusBar 
//         barStyle="light-content" 
//         backgroundColor="transparent" 
//         translucent 
//       />
      
//       {/* Register Header */}
//       <View style={[
//         styles.registerHeader,
//         isSmallDevice && styles.smallRegisterHeader,
//         isTablet && styles.tabletRegisterHeader
//       ]}>
//         <Text style={[
//           styles.registerHeaderTitle,
//           isSmallDevice && styles.smallRegisterHeaderTitle,
//           isTablet && styles.tabletRegisterHeaderTitle
//         ]}>Register</Text>
//       </View>

//       {/* Top Half with Background Image */}
//       <View style={[
//         styles.imageTopContainer,
//         isSmallDevice && styles.smallImageTopContainer,
//         isTablet && styles.tabletImageTopContainer,
//         isLandscape && styles.landscapeImageTopContainer
//       ]}>
//         <ImageBackground 
//           source={backgroundImage} 
//           style={styles.backgroundImage}
//           resizeMode="cover"
//         />
//       </View>

//       {/* Bottom Half with Register Form */}
//       <KeyboardAvoidingView 
//         style={[
//           styles.formContainer,
//           isLandscape && styles.landscapeFormContainer
//         ]}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
//       >
//         <View style={[
//           styles.formContent,
//           isSmallDevice && styles.smallFormContent,
//           isTablet && styles.tabletFormContent,
//           isLandscape && styles.landscapeFormContent
//         ]}>
//           {/* Register Form Card Container - Positioned to touch the image */}
//           <View style={[
//             styles.registerCardContainer,
//             isSmallDevice && styles.smallRegisterCardContainer,
//             isTablet && styles.tabletRegisterCardContainer
//           ]}>
//             <View style={[
//               styles.registerCard,
//               isSmallDevice && styles.smallRegisterCard,
//               isTablet && styles.tabletRegisterCard
//             ]}>
//               {/* Register Title with Orange Background */}
//               <View style={[
//                 styles.registerTitleContainer,
//                 isSmallDevice && styles.smallRegisterTitleContainer,
//                 isTablet && styles.tabletRegisterTitleContainer
//               ]}>
//                 <Text style={[
//                   styles.registerTitle,
//                   isSmallDevice && styles.smallRegisterTitle,
//                   isTablet && styles.tabletRegisterTitle
//                 ]}>Register for Free</Text>
//               </View>
              
//               {/* Content without ScrollView - All in one page */}
//               <View style={styles.contentContainer}>
//                 {/* Profile Selection */}
//                 <View style={[
//                   styles.profileSection,
//                   isSmallDevice && styles.smallProfileSection,
//                   isTablet && styles.tabletProfileSection
//                 ]}>
//                   <Text style={[
//                     styles.profileLabel,
//                     isSmallDevice && styles.smallProfileLabel,
//                     isTablet && styles.tabletProfileLabel
//                   ]}>Select a profile for</Text>
//                   <View style={[
//                     styles.profileOptions,
//                     isSmallDevice && styles.smallProfileOptions,
//                     isTablet && styles.tabletProfileOptions
//                   ]}>
//                     <TouchableOpacity 
//                       style={[
//                         styles.profileOption,
//                         isSmallDevice && styles.smallProfileOption,
//                         isTablet && styles.tabletProfileOption,
//                         formData.selectedProfile === "Myself" && styles.profileOptionSelected
//                       ]}
//                       onPress={() => handleInputChange('selectedProfile', "Myself")}
//                     >
//                       <Text style={[
//                         styles.profileOptionText,
//                         isSmallDevice && styles.smallProfileOptionText,
//                         isTablet && styles.tabletProfileOptionText,
//                         formData.selectedProfile === "Myself" && styles.profileOptionTextSelected
//                       ]}>
//                         Myself
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity 
//                       style={[
//                         styles.profileOption,
//                         isSmallDevice && styles.smallProfileOption,
//                         isTablet && styles.tabletProfileOption,
//                         formData.selectedProfile === "Others" && styles.profileOptionSelected
//                       ]}
//                       onPress={() => handleInputChange('selectedProfile', "Others")}
//                     >
//                       <Text style={[
//                         styles.profileOptionText,
//                         isSmallDevice && styles.smallProfileOptionText,
//                         isTablet && styles.tabletProfileOptionText,
//                         formData.selectedProfile === "Others" && styles.profileOptionTextSelected
//                       ]}>
//                         Others
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>

//                 {/* Full Name Field */}
//                 <View style={[
//                   styles.inputWrapper,
//                   isSmallDevice && styles.smallInputWrapper,
//                   isTablet && styles.tabletInputWrapper
//                 ]}>
//                   <Text style={[
//                     styles.inputLabel,
//                     isSmallDevice && styles.smallInputLabel,
//                     isTablet && styles.tabletInputLabel
//                   ]}>Full Name</Text>
//                   <TextInput
//                     style={[
//                       styles.textInput,
//                       isSmallDevice && styles.smallTextInput,
//                       isTablet && styles.tabletTextInput
//                     ]}
//                     placeholder="Enter your full name"
//                     placeholderTextColor="#999"
//                     value={formData.fullName}
//                     onChangeText={(value) => handleInputChange('fullName', value)}
//                     autoCapitalize="words"
//                     autoCorrect={false}
//                   />
//                 </View>

//                 {/* Mobile Number Field */}
//                 <View style={[
//                   styles.inputWrapper,
//                   isSmallDevice && styles.smallInputWrapper,
//                   isTablet && styles.tabletInputWrapper
//                 ]}>
//                   <Text style={[
//                     styles.inputLabel,
//                     isSmallDevice && styles.smallInputLabel,
//                     isTablet && styles.tabletInputLabel
//                   ]}>Mobile Number</Text>
//                   <TextInput
//                     style={[
//                       styles.textInput,
//                       isSmallDevice && styles.smallTextInput,
//                       isTablet && styles.tabletTextInput
//                     ]}
//                     placeholder="Enter your mobile number"
//                     placeholderTextColor="#999"
//                     value={formData.mobileNumber}
//                     onChangeText={(value) => handleInputChange('mobileNumber', value)}
//                     keyboardType="phone-pad"
//                     autoCapitalize="none"
//                     maxLength={10}
//                   />
//                 </View>

//                 {/* Password Field */}
//                 <View style={[
//                   styles.inputWrapper,
//                   isSmallDevice && styles.smallInputWrapper,
//                   isTablet && styles.tabletInputWrapper
//                 ]}>
//                   <Text style={[
//                     styles.inputLabel,
//                     isSmallDevice && styles.smallInputLabel,
//                     isTablet && styles.tabletInputLabel
//                   ]}>Create Password</Text>
//                   <TextInput
//                     style={[
//                       styles.textInput,
//                       isSmallDevice && styles.smallTextInput,
//                       isTablet && styles.tabletTextInput
//                     ]}
//                     placeholder="Create a password"
//                     placeholderTextColor="#999"
//                     value={formData.password}
//                     onChangeText={(value) => handleInputChange('password', value)}
//                     secureTextEntry
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                   />
//                 </View>

//                 {/* Register Button - Light Green */}
//                 <TouchableOpacity 
//                   style={[
//                     styles.registerButton,
//                     (!formData.fullName || !formData.mobileNumber || !formData.password) && styles.registerButtonDisabled,
//                     isSmallDevice && styles.smallRegisterButton,
//                     isTablet && styles.tabletRegisterButton
//                   ]} 
//                   onPress={handleRegisterNow}
//                   disabled={!formData.fullName || !formData.mobileNumber || !formData.password}
//                 >
//                   <Text style={[
//                     styles.registerButtonText,
//                     isSmallDevice && styles.smallRegisterButtonText,
//                     isTablet && styles.tabletRegisterButtonText
//                   ]}>Register Now</Text>
//                 </TouchableOpacity>

//                 {/* Login Link - Blue */}
//                 <View style={[
//                   styles.loginContainer,
//                   isSmallDevice && styles.smallLoginContainer,
//                   isTablet && styles.tabletLoginContainer
//                 ]}>
//                   <Text style={[
//                     styles.loginText,
//                     isSmallDevice && styles.smallLoginText,
//                     isTablet && styles.tabletLoginText
//                   ]}>Already a member? </Text>
//                   <TouchableOpacity onPress={handleNavigateToLogin}>
//                     <Text style={[
//                       styles.loginLink,
//                       isSmallDevice && styles.smallLoginLink,
//                       isTablet && styles.tabletLoginLink
//                     ]}>Login here</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   landscapeSafeArea: {
//     flexDirection: 'row',
//   },

//   // Header Styles
//   registerHeader: {
//     paddingTop: verticalScale(15),
//     paddingHorizontal: moderateScale(20),
//     paddingBottom: verticalScale(8),
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   smallRegisterHeader: {
//     paddingTop: verticalScale(12),
//     paddingBottom: verticalScale(6),
//   },
//   tabletRegisterHeader: {
//     paddingTop: verticalScale(20),
//     paddingBottom: verticalScale(12),
//   },
//   registerHeaderTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: 'bold',
//     color: '#4a154b',
//     textAlign: 'center',
//   },
//   smallRegisterHeaderTitle: {
//     fontSize: moderateScale(16),
//   },
//   tabletRegisterHeaderTitle: {
//     fontSize: moderateScale(22),
//   },

//   // Image Container - Reduced height to fit everything
//   imageTopContainer: {
//     height: screenHeight * 0.25,
//     width: '100%',
//   },
//   smallImageTopContainer: {
//     height: screenHeight * 0.22,
//   },
//   tabletImageTopContainer: {
//     height: screenHeight * 0.28,
//   },
//   landscapeImageTopContainer: {
//     height: '100%',
//     width: '50%',
//   },
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },

//   // Form Container
//   formContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   landscapeFormContainer: {
//     width: '50%',
//   },

//   // Form Content - Reduced padding
//   formContent: {
//     flex: 1,
//     paddingHorizontal: moderateScale(20),
//     paddingTop: verticalScale(0),
//     paddingBottom: verticalScale(10),
//     justifyContent: 'flex-start',
//   },
//   smallFormContent: {
//     paddingHorizontal: moderateScale(15),
//     paddingTop: verticalScale(0),
//   },
//   tabletFormContent: {
//     paddingHorizontal: moderateScale(30),
//     paddingTop: verticalScale(0),
//   },
//   landscapeFormContent: {
//     justifyContent: 'flex-start',
//   },

//   // Register Card Container - Reduced negative margin
//   registerCardContainer: {
//     marginTop: verticalScale(-25),
//     flex: 1,
//   },
//   smallRegisterCardContainer: {
//     marginTop: verticalScale(-20),
//   },
//   tabletRegisterCardContainer: {
//     marginTop: verticalScale(-30),
//     maxWidth: 500,
//     alignSelf: 'center',
//     width: '100%',
//   },

//   // Register Card - Reduced minHeight
//   registerCard: {
//     backgroundColor: '#fff',
//     borderRadius: moderateScale(25),
//     borderTopLeftRadius: moderateScale(25),
//     borderTopRightRadius: moderateScale(25),
//     padding: 0,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.25,
//     shadowRadius: 8,
//     elevation: 8,
//     overflow: 'hidden',
//     flex: 1,
//     minHeight: screenHeight * 0.5,
//   },
//   smallRegisterCard: {
//     borderRadius: moderateScale(20),
//     borderTopLeftRadius: moderateScale(20),
//     borderTopRightRadius: moderateScale(20),
//     minHeight: screenHeight * 0.45,
//   },
//   tabletRegisterCard: {
//     borderRadius: moderateScale(30),
//     borderTopLeftRadius: moderateScale(30),
//     borderTopRightRadius: moderateScale(30),
//     width: '100%',
//     minHeight: screenHeight * 0.55,
//   },

//   // Content Container
//   contentContainer: {
//     flex: 1,
//     paddingVertical: verticalScale(5),
//   },

//   // Register Title Container - Reduced padding
//   registerTitleContainer: {
//     backgroundColor: '#f97316',
//     paddingVertical: verticalScale(15),
//     paddingHorizontal: moderateScale(20),
//     borderTopLeftRadius: moderateScale(25),
//     borderTopRightRadius: moderateScale(25),
//   },
//   smallRegisterTitleContainer: {
//     paddingVertical: verticalScale(12),
//     paddingHorizontal: moderateScale(15),
//     borderTopLeftRadius: moderateScale(20),
//     borderTopRightRadius: moderateScale(20),
//   },
//   tabletRegisterTitleContainer: {
//     paddingVertical: verticalScale(18),
//     paddingHorizontal: moderateScale(25),
//     borderTopLeftRadius: moderateScale(30),
//     borderTopRightRadius: moderateScale(30),
//   },
//   registerTitle: {
//     fontSize: moderateScale(20),
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//   },
//   smallRegisterTitle: {
//     fontSize: moderateScale(18),
//   },
//   tabletRegisterTitle: {
//     fontSize: moderateScale(24),
//   },

//   // Profile Section - Reduced padding
//   profileSection: {
//     paddingHorizontal: moderateScale(20),
//     paddingTop: verticalScale(15),
//     paddingBottom: verticalScale(8),
//   },
//   smallProfileSection: {
//     paddingHorizontal: moderateScale(15),
//     paddingTop: verticalScale(12),
//     paddingBottom: verticalScale(6),
//   },
//   tabletProfileSection: {
//     paddingHorizontal: moderateScale(25),
//     paddingTop: verticalScale(18),
//     paddingBottom: verticalScale(10),
//   },
//   profileLabel: {
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//     color: '#bcbcbc',
//     marginBottom: verticalScale(10),
//     textAlign: 'center',
//   },
//   smallProfileLabel: {
//     fontSize: moderateScale(12),
//     marginBottom: verticalScale(8),
//   },
//   tabletProfileLabel: {
//     fontSize: moderateScale(16),
//     marginBottom: verticalScale(12),
//   },

//   // Profile Options - Reduced sizes
//   profileOptions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: moderateScale(6),
//   },
//   smallProfileOptions: {
//     marginHorizontal: moderateScale(4),
//   },
//   tabletProfileOptions: {
//     marginHorizontal: moderateScale(10),
//   },
//   profileOption: {
//     flex: 1,
//     paddingVertical: verticalScale(10),
//     paddingHorizontal: moderateScale(8),
//     borderRadius: moderateScale(14),
//     backgroundColor: '#f3f4f6',
//     marginHorizontal: moderateScale(2),
//     borderWidth: 2,
//     borderColor: 'transparent',
//     minHeight: verticalScale(38),
//   },
//   smallProfileOption: {
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: moderateScale(6),
//     borderRadius: moderateScale(12),
//     minHeight: verticalScale(35),
//   },
//   tabletProfileOption: {
//     paddingVertical: verticalScale(12),
//     paddingHorizontal: moderateScale(10),
//     borderRadius: moderateScale(16),
//     minHeight: verticalScale(45),
//   },
//   profileOptionSelected: {
//     backgroundColor: '#4a154b',
//     borderColor: '#4a154b',
//   },
//   profileOptionText: {
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//     color: '#bcbcbc',
//     textAlign: 'center',
//   },
//   smallProfileOptionText: {
//     fontSize: moderateScale(12),
//   },
//   tabletProfileOptionText: {
//     fontSize: moderateScale(16),
//   },
//   profileOptionTextSelected: {
//     color: '#ffffff',
//     fontWeight: '600',
//   },

//   // Input Wrapper - Reduced margins and padding
//   inputWrapper: {
//     marginBottom: verticalScale(12),
//     paddingHorizontal: moderateScale(20),
//   },
//   smallInputWrapper: {
//     marginBottom: verticalScale(10),
//     paddingHorizontal: moderateScale(15),
//   },
//   tabletInputWrapper: {
//     marginBottom: verticalScale(15),
//     paddingHorizontal: moderateScale(25),
//   },

//   // Input Label - Reduced font size
//   inputLabel: {
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//     color: '#bcbcbc',
//     marginBottom: verticalScale(6),
//   },
//   smallInputLabel: {
//     fontSize: moderateScale(12),
//     marginBottom: verticalScale(4),
//   },
//   tabletInputLabel: {
//     fontSize: moderateScale(16),
//     marginBottom: verticalScale(8),
//   },

//   // Text Input - Reduced sizes
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#d6d6d6',
//     borderRadius: moderateScale(6),
//     padding: moderateScale(12),
//     fontSize: moderateScale(14),
//     backgroundColor: '#ffffff',
//     color: '#4a154b',
//     minHeight: verticalScale(42),
//   },
//   smallTextInput: {
//     padding: moderateScale(10),
//     fontSize: moderateScale(12),
//     minHeight: verticalScale(38),
//     borderRadius: moderateScale(5),
//   },
//   tabletTextInput: {
//     padding: moderateScale(14),
//     fontSize: moderateScale(16),
//     minHeight: verticalScale(48),
//     borderRadius: moderateScale(8),
//   },

//   // Register Button - Reduced sizes
//   registerButton: {
//     backgroundColor: '#16a34a',
//     padding: moderateScale(12),
//     borderRadius: moderateScale(6),
//     alignItems: 'center',
//     marginTop: verticalScale(8),
//     marginBottom: verticalScale(12),
//     marginHorizontal: moderateScale(20),
//     minHeight: verticalScale(42),
//   },
//   smallRegisterButton: {
//     padding: moderateScale(10),
//     marginHorizontal: moderateScale(15),
//     minHeight: verticalScale(38),
//     borderRadius: moderateScale(5),
//   },
//   tabletRegisterButton: {
//     padding: moderateScale(16),
//     marginHorizontal: moderateScale(25),
//     minHeight: verticalScale(48),
//     borderRadius: moderateScale(8),
//   },
//   registerButtonDisabled: {
//     backgroundColor: '#16a34a',
//     opacity: 0.6,
//   },
//   registerButtonText: {
//     color: '#fff',
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//   },
//   smallRegisterButtonText: {
//     fontSize: moderateScale(14),
//   },
//   tabletRegisterButtonText: {
//     fontSize: moderateScale(18),
//   },

//   // Login Container - Reduced padding
//   loginContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     paddingHorizontal: moderateScale(20),
//     paddingBottom: verticalScale(15),
//     paddingTop: verticalScale(5),
//   },
//   smallLoginContainer: {
//     paddingHorizontal: moderateScale(15),
//     paddingBottom: verticalScale(12),
//   },
//   tabletLoginContainer: {
//     paddingHorizontal: moderateScale(25),
//     paddingBottom: verticalScale(18),
//   },
//   loginText: {
//     fontSize: moderateScale(14),
//     color: "#666",
//   },
//   smallLoginText: {
//     fontSize: moderateScale(12),
//   },
//   tabletLoginText: {
//     fontSize: moderateScale(16),
//   },
//   loginLink: {
//     fontSize: moderateScale(14),
//     color: "#2563eb",
//     fontWeight: "500",
//   },
//   smallLoginLink: {
//     fontSize: moderateScale(12),
//   },
//   tabletLoginLink: { 
//     fontSize: moderateScale(16),
//   },
// });

// export default RegisterForm;




import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Alert,
  Dimensions,
  useWindowDimensions,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Responsive scaling functions
const scale = (size) => (screenWidth / 375) * size;
const verticalScale = (size) => (screenHeight / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const RegisterForm = ({ onRegister, backgroundImage, onNavigateToLogin, onNavigateToBasicDetails }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    password: "",
    selectedProfile: "Myself",
  });

  const { width, height } = useWindowDimensions();

  // Device classification
  const isSmallDevice = width < 360;
  const isTablet = width >= 768;
  const isLandscape = width > height;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegisterNow = () => {
    if (!formData.fullName || !formData.mobileNumber || !formData.password) {
      Alert.alert(
        "Registration Failed",
        "Please fill in all fields",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    if (onNavigateToBasicDetails) {
      onNavigateToBasicDetails(formData);
    }
  };

  const handleNavigateToLogin = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  return (
    <SafeAreaView style={[
      styles.safeArea,
      isLandscape && styles.landscapeSafeArea
    ]}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent 
      />
      
      {/* Register Header */}
      <View style={[
        styles.registerHeader,
        isSmallDevice && styles.smallRegisterHeader,
        isTablet && styles.tabletRegisterHeader
      ]}>
        <Text style={[
          styles.registerHeaderTitle,
          isSmallDevice && styles.smallRegisterHeaderTitle,
          isTablet && styles.tabletRegisterHeaderTitle
        ]}>Register</Text>
      </View>

      {/* Top Half with Background Image */}
      <View style={[
        styles.imageTopContainer,
        isSmallDevice && styles.smallImageTopContainer,
        isTablet && styles.tabletImageTopContainer,
        isLandscape && styles.landscapeImageTopContainer
      ]}>
        <ImageBackground 
          source={backgroundImage} 
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>

      {/* Bottom Half with Register Form */}
      <KeyboardAvoidingView 
        style={[
          styles.formContainer,
          isLandscape && styles.landscapeFormContainer
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={[
          styles.formContent,
          isSmallDevice && styles.smallFormContent,
          isTablet && styles.tabletFormContent,
          isLandscape && styles.landscapeFormContent
        ]}>
          {/* Register Form Card Container - Positioned to touch the image */}
          <View style={[
            styles.registerCardContainer,
            isSmallDevice && styles.smallRegisterCardContainer,
            isTablet && styles.tabletRegisterCardContainer
          ]}>
            <View style={[
              styles.registerCard,
              isSmallDevice && styles.smallRegisterCard,
              isTablet && styles.tabletRegisterCard
            ]}>
              {/* Register Title with Orange Background */}
              <View style={[
                styles.registerTitleContainer,
                isSmallDevice && styles.smallRegisterTitleContainer,
                isTablet && styles.tabletRegisterTitleContainer
              ]}>
                <Text style={[
                  styles.registerTitle,
                  isSmallDevice && styles.smallRegisterTitle,
                  isTablet && styles.tabletRegisterTitle
                ]}>Register for Free</Text>
              </View>
              
              {/* Content without ScrollView - All in one page */}
              <View style={styles.contentContainer}>
                {/* Profile Selection */}
                <View style={[
                  styles.profileSection,
                  isSmallDevice && styles.smallProfileSection,
                  isTablet && styles.tabletProfileSection
                ]}>
                  <Text style={[
                    styles.profileLabel,
                    isSmallDevice && styles.smallProfileLabel,
                    isTablet && styles.tabletProfileLabel
                  ]}>Select a profile for</Text>
                  <View style={[
                    styles.profileOptions,
                    isSmallDevice && styles.smallProfileOptions,
                    isTablet && styles.tabletProfileOptions
                  ]}>
                    <TouchableOpacity 
                      style={[
                        styles.profileOption,
                        isSmallDevice && styles.smallProfileOption,
                        isTablet && styles.tabletProfileOption,
                        formData.selectedProfile === "Myself" && styles.profileOptionSelected
                      ]}
                      onPress={() => handleInputChange('selectedProfile', "Myself")}
                    >
                      <Text style={[
                        styles.profileOptionText,
                        isSmallDevice && styles.smallProfileOptionText,
                        isTablet && styles.tabletProfileOptionText,
                        formData.selectedProfile === "Myself" && styles.profileOptionTextSelected
                      ]}>
                        Myself
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.profileOption,
                        isSmallDevice && styles.smallProfileOption,
                        isTablet && styles.tabletProfileOption,
                        formData.selectedProfile === "Others" && styles.profileOptionSelected
                      ]}
                      onPress={() => handleInputChange('selectedProfile', "Others")}
                    >
                      <Text style={[
                        styles.profileOptionText,
                        isSmallDevice && styles.smallProfileOptionText,
                        isTablet && styles.tabletProfileOptionText,
                        formData.selectedProfile === "Others" && styles.profileOptionTextSelected
                      ]}>
                        Others
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Full Name Field */}
                <View style={[
                  styles.inputWrapper,
                  isSmallDevice && styles.smallInputWrapper,
                  isTablet && styles.tabletInputWrapper
                ]}>
                  <Text style={[
                    styles.inputLabel,
                    isSmallDevice && styles.smallInputLabel,
                    isTablet && styles.tabletInputLabel
                  ]}>Full Name</Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      isSmallDevice && styles.smallTextInput,
                      isTablet && styles.tabletTextInput
                    ]}
                    placeholder="Enter your full name"
                    placeholderTextColor="#bcbcbc"
                    value={formData.fullName}
                    onChangeText={(value) => handleInputChange('fullName', value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>

                {/* Mobile Number Field */}
                <View style={[
                  styles.inputWrapper,
                  isSmallDevice && styles.smallInputWrapper,
                  isTablet && styles.tabletInputWrapper
                ]}>
                  <Text style={[
                    styles.inputLabel,
                    isSmallDevice && styles.smallInputLabel,
                    isTablet && styles.tabletInputLabel
                  ]}>Mobile Number</Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      isSmallDevice && styles.smallTextInput,
                      isTablet && styles.tabletTextInput
                    ]}
                    placeholder="Enter your mobile number"
                    placeholderTextColor="#bcbcbc"
                    value={formData.mobileNumber}
                    onChangeText={(value) => handleInputChange('mobileNumber', value)}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    maxLength={10}
                  />
                </View>

                {/* Password Field */}
                <View style={[
                  styles.inputWrapper,
                  isSmallDevice && styles.smallInputWrapper,
                  isTablet && styles.tabletInputWrapper
                ]}>
                  <Text style={[
                    styles.inputLabel,
                    isSmallDevice && styles.smallInputLabel,
                    isTablet && styles.tabletInputLabel
                  ]}>Create Password</Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      isSmallDevice && styles.smallTextInput,
                      isTablet && styles.tabletTextInput
                    ]}
                    placeholder="Create a password"
                    placeholderTextColor="#bcbcbc"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                {/* Register Button - Light Green */}
                <TouchableOpacity 
                  style={[
                    styles.registerButton,
                    (!formData.fullName || !formData.mobileNumber || !formData.password) && styles.registerButtonDisabled,
                    isSmallDevice && styles.smallRegisterButton,
                    isTablet && styles.tabletRegisterButton
                  ]} 
                  onPress={handleRegisterNow}
                  disabled={!formData.fullName || !formData.mobileNumber || !formData.password}
                >
                  <Text style={[
                    styles.registerButtonText,
                    isSmallDevice && styles.smallRegisterButtonText,
                    isTablet && styles.tabletRegisterButtonText
                  ]}>Register Now</Text>
                </TouchableOpacity>

                {/* Login Link - Blue */}
                <View style={[
                  styles.loginContainer,
                  isSmallDevice && styles.smallLoginContainer,
                  isTablet && styles.tabletLoginContainer
                ]}>
                  <Text style={[
                    styles.loginText,
                    isSmallDevice && styles.smallLoginText,
                    isTablet && styles.tabletLoginText
                  ]}>Already a member? </Text>
                  <TouchableOpacity onPress={handleNavigateToLogin}>
                    <Text style={[
                      styles.loginLink,
                      isSmallDevice && styles.smallLoginLink,
                      isTablet && styles.tabletLoginLink
                    ]}>Login here</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  landscapeSafeArea: {
    flexDirection: 'row',
  },

  // Header Styles
  registerHeader: {
    paddingTop: verticalScale(15),
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(8),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  smallRegisterHeader: {
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(6),
  },
  tabletRegisterHeader: {
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(12),
  },
  registerHeaderTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#4a154b',
    textAlign: 'center',
  },
  smallRegisterHeaderTitle: {
    fontSize: moderateScale(16),
  },
  tabletRegisterHeaderTitle: {
    fontSize: moderateScale(22),
  },

  // Image Container - Reduced height to fit everything
  imageTopContainer: {
    height: screenHeight * 0.25,
    width: '100%',
  },
  smallImageTopContainer: {
    height: screenHeight * 0.22,
  },
  tabletImageTopContainer: {
    height: screenHeight * 0.28,
  },
  landscapeImageTopContainer: {
    height: '100%',
    width: '50%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  // Form Container
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  landscapeFormContainer: {
    width: '50%',
  },

  // Form Content - Reduced padding
  formContent: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(0),
    paddingBottom: verticalScale(10),
    justifyContent: 'flex-start',
  },
  smallFormContent: {
    paddingHorizontal: moderateScale(15),
    paddingTop: verticalScale(0),
  },
  tabletFormContent: {
    paddingHorizontal: moderateScale(30),
    paddingTop: verticalScale(0),
  },
  landscapeFormContent: {
    justifyContent: 'flex-start',
  },

  // Register Card Container - Reduced negative margin
  registerCardContainer: {
    marginTop: verticalScale(-25),
    flex: 1,
  },
  smallRegisterCardContainer: {
    marginTop: verticalScale(-20),
  },
  tabletRegisterCardContainer: {
    marginTop: verticalScale(-30),
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },

  // Register Card - Reduced minHeight
  registerCard: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(25),
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
    flex: 1,
    minHeight: screenHeight * 0.5,
  },
  smallRegisterCard: {
    borderRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    minHeight: screenHeight * 0.45,
  },
  tabletRegisterCard: {
    borderRadius: moderateScale(30),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    width: '100%',
    minHeight: screenHeight * 0.55,
  },

  // Content Container
  contentContainer: {
    flex: 1,
    paddingVertical: verticalScale(5),
  },

  // Register Title Container - Reduced padding
  registerTitleContainer: {
    backgroundColor: '#f97316',
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(20),
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
  },
  smallRegisterTitleContainer: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(15),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  tabletRegisterTitleContainer: {
    paddingVertical: verticalScale(18),
    paddingHorizontal: moderateScale(25),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  registerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  smallRegisterTitle: {
    fontSize: moderateScale(18),
  },
  tabletRegisterTitle: {
    fontSize: moderateScale(24),
  },

  // Profile Section - Reduced padding
  profileSection: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(8),
  },
  smallProfileSection: {
    paddingHorizontal: moderateScale(15),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(6),
  },
  tabletProfileSection: {
    paddingHorizontal: moderateScale(25),
    paddingTop: verticalScale(18),
    paddingBottom: verticalScale(10),
  },
  profileLabel: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#bcbcbc',
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  smallProfileLabel: {
    fontSize: moderateScale(12),
    marginBottom: verticalScale(8),
  },
  tabletProfileLabel: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(12),
  },

  // Profile Options - Reduced sizes
  profileOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(6),
  },
  smallProfileOptions: {
    marginHorizontal: moderateScale(4),
  },
  tabletProfileOptions: {
    marginHorizontal: moderateScale(10),
  },
  profileOption: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(14),
    backgroundColor: '#f3f4f6',
    marginHorizontal: moderateScale(2),
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: verticalScale(38),
  },
  smallProfileOption: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(6),
    borderRadius: moderateScale(12),
    minHeight: verticalScale(35),
  },
  tabletProfileOption: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(16),
    minHeight: verticalScale(45),
  },
  profileOptionSelected: {
    backgroundColor: '#4a154b',
    borderColor: '#4a154b',
  },
  profileOptionText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#bcbcbc',
    textAlign: 'center',
  },
  smallProfileOptionText: {
    fontSize: moderateScale(12),
  },
  tabletProfileOptionText: {
    fontSize: moderateScale(16),
  },
  profileOptionTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },

  // Input Wrapper - Reduced margins and padding
  inputWrapper: {
    marginBottom: verticalScale(12),
    paddingHorizontal: moderateScale(20),
  },
  smallInputWrapper: {
    marginBottom: verticalScale(10),
    paddingHorizontal: moderateScale(15),
  },
  tabletInputWrapper: {
    marginBottom: verticalScale(15),
    paddingHorizontal: moderateScale(25),
  },

  // Input Label - Reduced font size
  inputLabel: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#bcbcbc',
    marginBottom: verticalScale(6),
  },
  smallInputLabel: {
    fontSize: moderateScale(12),
    marginBottom: verticalScale(4),
  },
  tabletInputLabel: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(8),
  },

  // Text Input - With updated colors
  textInput: {
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: moderateScale(6),
    padding: moderateScale(12),
    fontSize: moderateScale(14),
    backgroundColor: '#ffffff',
    color: '#000000',
    minHeight: verticalScale(42),
  },
  smallTextInput: {
    padding: moderateScale(10),
    fontSize: moderateScale(12),
    minHeight: verticalScale(38),
    borderRadius: moderateScale(5),
  },
  tabletTextInput: {
    padding: moderateScale(14),
    fontSize: moderateScale(16),
    minHeight: verticalScale(48),
    borderRadius: moderateScale(8),
  },

  // Register Button - Reduced sizes
  registerButton: {
    backgroundColor: '#16a34a',
    padding: moderateScale(12),
    borderRadius: moderateScale(6),
    alignItems: 'center',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(12),
    marginHorizontal: moderateScale(20),
    minHeight: verticalScale(42),
  },
  smallRegisterButton: {
    padding: moderateScale(10),
    marginHorizontal: moderateScale(15),
    minHeight: verticalScale(38),
    borderRadius: moderateScale(5),
  },
  tabletRegisterButton: {
    padding: moderateScale(16),
    marginHorizontal: moderateScale(25),
    minHeight: verticalScale(48),
    borderRadius: moderateScale(8),
  },
  registerButtonDisabled: {
    backgroundColor: '#16a34a',
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  smallRegisterButtonText: {
    fontSize: moderateScale(14),
  },
  tabletRegisterButtonText: {
    fontSize: moderateScale(18),
  },

  // Login Container - Reduced padding
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(15),
    paddingTop: verticalScale(5),
  },
  smallLoginContainer: {
    paddingHorizontal: moderateScale(15),
    paddingBottom: verticalScale(12),
  },
  tabletLoginContainer: {
    paddingHorizontal: moderateScale(25),
    paddingBottom: verticalScale(18),
  },
  loginText: {
    fontSize: moderateScale(14),
    color: "#666",
  },
  smallLoginText: {
    fontSize: moderateScale(12),
  },
  tabletLoginText: {
    fontSize: moderateScale(16),
  },
  loginLink: {
    fontSize: moderateScale(14),
    color: "#2563eb",
    fontWeight: "500",
  },
  smallLoginLink: {
    fontSize: moderateScale(12),
  },
  tabletLoginLink: { 
    fontSize: moderateScale(16),
  },
});

export default RegisterForm;



