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

const LoginForm = ({ onLoginSuccess, onNavigateToRegister, backgroundImage, registeredUsers = [] }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { width, height } = useWindowDimensions();

  // Device classification
  const isSmallDevice = width < 360;
  const isMediumDevice = width >= 360 && width < 420;
  const isLargeDevice = width >= 420;
  const isTablet = width >= 768;
  const isLandscape = width > height;

  const handleLogin = () => {
    if (username && password) {
      // Trim and validate input
      const trimmedUsername = username.trim().toLowerCase();
      const trimmedPassword = password.trim();

      console.log('🔐 Login attempt:', { username: trimmedUsername });
      console.log('📊 Registered users:', registeredUsers);

      // Find user in registered users
      const userExists = registeredUsers.find(
        user => user.username.toLowerCase() === trimmedUsername && 
                user.password === trimmedPassword &&
                user.isRegistered === true
      );

      if (userExists) {
        console.log('✅ Login successful for user:', userExists);
        // Directly call onLoginSuccess to navigate to Dashboard
        if (onLoginSuccess) {
          onLoginSuccess({ 
            username: userExists.username, 
            password: userExists.password,
            email: userExists.email,
            mobile: userExists.mobile,
            fullName: userExists.fullName
          });
        }
      } else {
        console.log('❌ Login failed - user not found or not registered');
        Alert.alert(
          "Login Failed",
          "Invalid username or password. Please check your credentials or complete your registration.",
          [
            {
              text: "OK",
              style: "default"
            },
            {
              text: "Sign Up",
              onPress: handleNavigateToRegister
            }
          ]
        );
      }
    } else {
      Alert.alert("Error", "Please enter both username and password");
    }
  };

  const handleNavigateToRegister = () => {
    console.log('Sign Up here clicked - navigating to register form');
    if (onNavigateToRegister) {
      onNavigateToRegister();
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
      
      {/* Login Header */}
      <View style={[
        styles.loginHeader,
        isSmallDevice && styles.smallLoginHeader,
        isTablet && styles.tabletLoginHeader
      ]}>
        <Text style={[
          styles.loginHeaderTitle,
          isSmallDevice && styles.smallLoginHeaderTitle,
          isTablet && styles.tabletLoginHeaderTitle
        ]}>Log in</Text>
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

      {/* Bottom Half with Login Form */}
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
          {/* Login Form Card - Positioned to touch the image */}
          <View style={[
            styles.loginCardContainer,
            isSmallDevice && styles.smallLoginCardContainer,
            isTablet && styles.tabletLoginCardContainer
          ]}>
            <View style={[
              styles.loginCard,
              isSmallDevice && styles.smallLoginCard,
              isTablet && styles.tabletLoginCard
            ]}>
              {/* Login Title with Orange Background */}
              <View style={[
                styles.loginTitleContainer,
                isSmallDevice && styles.smallLoginTitleContainer,
                isTablet && styles.tabletLoginTitleContainer
              ]}>
                <Text style={[
                  styles.loginTitle,
                  isSmallDevice && styles.smallLoginTitle,
                  isTablet && styles.tabletLoginTitle
                ]}>Login to your Account</Text>
              </View>
              
              {/* Username Field */}
              <View style={[
                styles.inputWrapper,
                isSmallDevice && styles.smallInputWrapper,
                isTablet && styles.tabletInputWrapper
              ]}>
                <Text style={[
                  styles.inputLabel,
                  isSmallDevice && styles.smallInputLabel,
                  isTablet && styles.tabletInputLabel
                ]}>Please enter username</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    isSmallDevice && styles.smallTextInput,
                    isTablet && styles.tabletTextInput
                  ]}
                  placeholder="Enter your username"
                  placeholderTextColor="#999"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
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
                ]}>Please enter password</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    isSmallDevice && styles.smallTextInput,
                    isTablet && styles.tabletTextInput
                  ]}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Login Button - Green */}
              <TouchableOpacity 
                style={[
                  styles.loginButton,
                  (!username || !password) && styles.loginButtonDisabled,
                  isSmallDevice && styles.smallLoginButton,
                  isTablet && styles.tabletLoginButton
                ]} 
                onPress={handleLogin}
                disabled={!username || !password}
              >
                <Text style={[
                  styles.loginButtonText,
                  isSmallDevice && styles.smallLoginButtonText,
                  isTablet && styles.tabletLoginButtonText
                ]}>Login</Text>
              </TouchableOpacity>

              {/* Sign Up Link - Blue */}
              <View style={[
                styles.signupContainer,
                isSmallDevice && styles.smallSignupContainer,
                isTablet && styles.tabletSignupContainer
              ]}>
                <Text style={[
                  styles.signupText,
                  isSmallDevice && styles.smallSignupText,
                  isTablet && styles.tabletSignupText
                ]}>Don't have an account? </Text>
                <TouchableOpacity onPress={handleNavigateToRegister}>
                  <Text style={[
                    styles.signupLink,
                    isSmallDevice && styles.smallSignupLink,
                    isTablet && styles.tabletSignupLink
                  ]}>Sign Up here</Text>
                </TouchableOpacity>
              </View>

              {/* Demo Credentials Hint */}
              <View style={styles.demoHint}>
                <Text style={styles.demoHintText}>
                  Demo: username: "demo", password: "demo123"
                </Text>
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
  loginHeader: {
    paddingTop: verticalScale(20),
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(10),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  smallLoginHeader: {
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(8),
  },
  tabletLoginHeader: {
    paddingTop: verticalScale(25),
    paddingBottom: verticalScale(15),
  },
  loginHeaderTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#4a154b',
    textAlign: 'center',
  },
  smallLoginHeaderTitle: {
    fontSize: moderateScale(16),
  },
  tabletLoginHeaderTitle: {
    fontSize: moderateScale(22),
  },
  imageTopContainer: {
    height: screenHeight * 0.35,
    width: '100%',
  },
  smallImageTopContainer: {
    height: screenHeight * 0.3,
  },
  tabletImageTopContainer: {
    height: screenHeight * 0.4,
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
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  landscapeFormContainer: {
    width: '50%',
  },
  formContent: {
    flex: 1,
    paddingHorizontal: moderateScale(25),
    paddingTop: verticalScale(0),
    paddingBottom: verticalScale(20),
    justifyContent: 'flex-start',
  },
  smallFormContent: {
    paddingHorizontal: moderateScale(15),
    paddingTop: verticalScale(0),
  },
  tabletFormContent: {
    paddingHorizontal: moderateScale(40),
    paddingTop: verticalScale(0),
  },
  landscapeFormContent: {
    justifyContent: 'flex-start',
  },
  loginCardContainer: {
    marginTop: verticalScale(-30),
  },
  smallLoginCardContainer: {
    marginTop: verticalScale(-25),
  },
  tabletLoginCardContainer: {
    marginTop: verticalScale(-40),
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  loginCard: {
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
  },
  smallLoginCard: {
    borderRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  tabletLoginCard: {
    borderRadius: moderateScale(30),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    width: '100%',
  },
  loginTitleContainer: {
    backgroundColor: '#f97316',
    paddingVertical: verticalScale(20),
    paddingHorizontal: moderateScale(25),
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
  },
  smallLoginTitleContainer: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  tabletLoginTitleContainer: {
    paddingVertical: verticalScale(25),
    paddingHorizontal: moderateScale(30),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  loginTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  smallLoginTitle: {
    fontSize: moderateScale(18),
  },
  tabletLoginTitle: {
    fontSize: moderateScale(26),
  },
  inputWrapper: {
    marginBottom: verticalScale(20),
    paddingHorizontal: moderateScale(25),
    paddingTop: verticalScale(20),
  },
  smallInputWrapper: {
    marginBottom: verticalScale(15),
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(15),
  },
  tabletInputWrapper: {
    marginBottom: verticalScale(25),
    paddingHorizontal: moderateScale(30),
    paddingTop: verticalScale(25),
  },
  inputLabel: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#bcbcbc',
    marginBottom: verticalScale(8),
  },
  smallInputLabel: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(6),
  },
  tabletInputLabel: {
    fontSize: moderateScale(18),
    marginBottom: verticalScale(10),
  },
  textInput: {
    borderWidth: 1,
    borderColor:'#d6d6d6',
    borderRadius: moderateScale(8),
    padding: moderateScale(15),
    fontSize: moderateScale(16),
    backgroundColor: '#ffffff',
    color: '#333',
    minHeight: verticalScale(50),
  },
  smallTextInput: {
    padding: moderateScale(12),
    fontSize: moderateScale(14),
    minHeight: verticalScale(45),
    borderRadius: moderateScale(6),
  },
  tabletTextInput: {
    padding: moderateScale(18),
    fontSize: moderateScale(18),
    minHeight: verticalScale(60),
    borderRadius: moderateScale(10),
  },
  loginButton: {
    backgroundColor: '#16a34a',
    padding: moderateScale(16),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
    marginHorizontal: moderateScale(25),
    minHeight: verticalScale(50),
  },
  smallLoginButton: {
    padding: moderateScale(14),
    marginHorizontal: moderateScale(20),
    minHeight: verticalScale(45),
    borderRadius: moderateScale(6),
  },
  tabletLoginButton: {
    padding: moderateScale(20),
    marginHorizontal: moderateScale(30),
    minHeight: verticalScale(60),
    borderRadius: moderateScale(10),
  },
  loginButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  smallLoginButtonText: {
    fontSize: moderateScale(16),
  },
  tabletLoginButtonText: {
    fontSize: moderateScale(20),
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: moderateScale(25),
    paddingBottom: verticalScale(20),
  },
  smallSignupContainer: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(15),
  },
  tabletSignupContainer: {
    paddingHorizontal: moderateScale(30),
    paddingBottom: verticalScale(25),
  },
  signupText: {
    fontSize: moderateScale(16),
    color: "#666",
  },
  smallSignupText: {
    fontSize: moderateScale(14),
  },
  tabletSignupText: {
    fontSize: moderateScale(18),
  },
  signupLink: {
    fontSize: moderateScale(16),
    color: "#2563eb",
    fontWeight: "500",
  },
  smallSignupLink: {
    fontSize: moderateScale(14),
  },
  tabletSignupLink: {
    fontSize: moderateScale(18),
  },
  demoHint: {
    paddingHorizontal: moderateScale(25),
    paddingBottom: verticalScale(15),
    alignItems: 'center',
  },
  demoHintText: {
    fontSize: moderateScale(12),
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default LoginForm;