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
  Alert,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Responsive scaling functions
const scale = (size) => (screenWidth / 375) * size;
const verticalScale = (size) => (screenHeight / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const RegisterProfessionalDetails = ({ 
  initialFormData, 
  onNavigateBack, 
  onRegisterComplete,
  onNavigateToNextStep 
}) => {
  const [formData, setFormData] = useState({
    highestEducation: "",
    employedIn: "",
    occupation: "",
    annualIncome: "",
    workLocation: "",
    state: "",
    ...initialFormData // Include data from previous forms
  });

  const { width, height } = useWindowDimensions();

  // Device classification
  const isSmallDevice = width < 360;
  const isMediumDevice = width >= 360 && width < 420;
  const isLargeDevice = width >= 420;
  const isTablet = width >= 768;
  const isLandscape = width > height;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinue = () => {
    // Validate professional details form
    if (!formData.highestEducation || !formData.employedIn || !formData.occupation || 
        !formData.annualIncome || !formData.workLocation || !formData.state) {
      Alert.alert(
        "Validation Error",
        "Please fill in all required professional details",
        [
          {
            text: "OK",
            style: "default"
          }
        ]
      );
      return;
    }

    // If all validations pass, proceed to next step
    if (onNavigateToNextStep) {
      onNavigateToNextStep(formData);
    } else {
      // If no next step handler, show success
      Alert.alert(
        "Registration Successful",
        "Your account has been created successfully!",
        [
          {
            text: "OK",
            onPress: () => onRegisterComplete && onRegisterComplete(formData),
          }
        ]
      );
    }
  };

  const handleNavigateBack = () => {
    if (onNavigateBack) {
      onNavigateBack();
    }
  };

  // Render step circles (1 to 5)
  const renderStepCircles = () => {
    const totalSteps = 5;
    const currentStep = 4; // Professional Details is step 4
    
    return (
      <View style={styles.stepCirclesContainer}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <View key={index} style={styles.stepCircleWrapper}>
            <View 
              style={[
                styles.stepCircle,
                index + 1 === currentStep && styles.stepCircleActive,
                index + 1 < currentStep && styles.stepCircleCompleted
              ]}
            >
              <Text 
                style={[
                  styles.stepCircleText,
                  (index + 1 === currentStep || index + 1 < currentStep) && styles.stepCircleTextActive
                ]}
              >
                {index + 1}
              </Text>
            </View>
            {index < totalSteps - 1 && (
              <View 
                style={[
                  styles.stepConnector,
                  index + 1 < currentStep && styles.stepConnectorActive
                ]} 
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={[
      styles.safeArea,
      isLandscape && styles.landscapeSafeArea
    ]}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#fff" 
      />
      
      {/* Header with Back Arrow and Title */}
      <View style={[
        styles.headerContainer,
        isSmallDevice && styles.smallHeaderContainer,
        isTablet && styles.tabletHeaderContainer
      ]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleNavigateBack}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          isSmallDevice && styles.smallHeaderTitle,
          isTablet && styles.tabletHeaderTitle
        ]}>register - professional details</Text>
      </View>

      {/* Main Content */}
      <KeyboardAvoidingView 
        style={[
          styles.formContainer,
          isLandscape && styles.landscapeFormContainer
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={[
            styles.formContent,
            isSmallDevice && styles.smallFormContent,
            isTablet && styles.tabletFormContent,
            isLandscape && styles.landscapeFormContent
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Step Progress with Circles */}
          <View style={styles.stepProgressContainer}>
            {renderStepCircles()}
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepIndicatorText}>
                4 of 5 Professional Details
              </Text>
              <View style={styles.stepNavigationText}>
                <Text style={styles.prevStepText}>Prev. Step: Personal Details</Text>
                <Text style={styles.nextStepText}>Next Step: About Yourself</Text>
              </View>
            </View>
          </View>

          {/* Professional Details Form */}
          <View style={styles.professionalDetailsContainer}>
            <Text style={styles.professionalDetailsTitle}>
              Please provide your professional details:
            </Text>
            
            {/* Highest Education */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Highest Education:</Text>
              <View style={styles.optionsRow}>
                <TouchableOpacity 
                  style={[
                    styles.optionButton,
                    formData.highestEducation === "No" && styles.optionButtonSelected
                  ]}
                  onPress={() => handleInputChange('highestEducation', "No")}
                >
                  <Text style={[
                    styles.optionButtonText,
                    formData.highestEducation === "No" && styles.optionButtonTextSelected
                  ]}>
                    No
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.optionButton,
                    formData.highestEducation === "Yes" && styles.optionButtonSelected
                  ]}
                  onPress={() => handleInputChange('highestEducation', "Yes")}
                >
                  <Text style={[
                    styles.optionButtonText,
                    formData.highestEducation === "Yes" && styles.optionButtonTextSelected
                  ]}>
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Employed In */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Employed In:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter employment sector"
                placeholderTextColor="#666"
                value={formData.employedIn}
                onChangeText={(value) => handleInputChange('employedIn', value)}
              />
            </View>

            {/* Occupation */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Occupation:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your occupation"
                placeholderTextColor="#666"
                value={formData.occupation}
                onChangeText={(value) => handleInputChange('occupation', value)}
              />
            </View>

            {/* Annual Income (Rs) */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Annual Income (Rs):</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter annual income"
                placeholderTextColor="#666"
                value={formData.annualIncome}
                onChangeText={(value) => handleInputChange('annualIncome', value)}
                keyboardType="numeric"
              />
            </View>

            {/* Work Location */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Work Location:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter work location"
                placeholderTextColor="#666"
                value={formData.workLocation}
                onChangeText={(value) => handleInputChange('workLocation', value)}
              />
            </View>

            {/* State */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>State:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter state"
                placeholderTextColor="#666"
                value={formData.state}
                onChangeText={(value) => handleInputChange('state', value)}
              />
            </View>

            {/* Continue Button */}
            <TouchableOpacity 
              style={[
                styles.continueButton,
                (!formData.highestEducation || !formData.employedIn || !formData.occupation || 
                 !formData.annualIncome || !formData.workLocation || !formData.state) && styles.continueButtonDisabled
              ]} 
              onPress={handleContinue}
              disabled={!formData.highestEducation || !formData.employedIn || !formData.occupation || 
                       !formData.annualIncome || !formData.workLocation || !formData.state}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: verticalScale(20),
    paddingHorizontal: moderateScale(15),
    paddingBottom: verticalScale(15),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  smallHeaderContainer: {
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(12),
  },
  tabletHeaderContainer: {
    paddingTop: verticalScale(25),
    paddingBottom: verticalScale(18),
  },
  backButton: {
    padding: moderateScale(8),
    marginRight: moderateScale(10),
  },
  backArrow: {
    fontSize: moderateScale(20),
    color: '#4a154b',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#4a154b',
    textTransform: 'lowercase',
    flex: 1,
    textAlign: 'center',
    marginRight: moderateScale(30),
  },
  smallHeaderTitle: {
    fontSize: moderateScale(14),
  },
  tabletHeaderTitle: {
    fontSize: moderateScale(18),
  },

  // Form Container
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  landscapeFormContainer: {
    width: '100%',
  },

  // Form Content
  formContent: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(20),
  },
  smallFormContent: {
    paddingHorizontal: moderateScale(15),
    paddingTop: verticalScale(10),
  },
  tabletFormContent: {
    paddingHorizontal: moderateScale(30),
    paddingTop: verticalScale(20),
  },
  landscapeFormContent: {
    justifyContent: 'flex-start',
  },

  // Step Progress Container
  stepProgressContainer: {
    marginBottom: verticalScale(25),
  },
  
  // Step Circles
  stepCirclesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  stepCircleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#4a154b',
    borderColor: '#4a154b',
  },
  stepCircleCompleted: {
    backgroundColor: '#4a154b',
    borderColor: '#4a154b',
  },
  stepCircleText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#e0e0e0',
  },
  stepCircleTextActive: {
    color: '#fff',
  },
  stepConnector: {
    width: moderateScale(20),
    height: 2,
    backgroundColor: '#e0e0e0',
    marginHorizontal: moderateScale(5),
  },
  stepConnectorActive: {
    backgroundColor: '#4a154b',
  },

  // Step Text Container
  stepTextContainer: {
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  stepIndicatorText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#4a154b',
    marginBottom: verticalScale(8),
  },
  stepNavigationText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  prevStepText: {
    fontSize: moderateScale(12),
    color: '#6c757d',
  },
  nextStepText: {
    fontSize: moderateScale(12),
    color: '#6c757d',
  },

  // Professional Details Container
  professionalDetailsContainer: {
    padding: moderateScale(15),
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  professionalDetailsTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#4a154b',
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },

  // Input Wrapper
  inputWrapper: {
    marginBottom: verticalScale(18),
  },
  smallInputWrapper: {
    marginBottom: verticalScale(15),
  },
  tabletInputWrapper: {
    marginBottom: verticalScale(22),
  },

  // Input Label
  inputLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#4a154b',
    marginBottom: verticalScale(8),
  },
  smallInputLabel: {
    fontSize: moderateScale(12),
    marginBottom: verticalScale(6),
  },
  tabletInputLabel: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(10),
  },

  // Text Input
  textInput: {
    borderWidth: 1,
    borderColor: '#4a154b',
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    fontSize: moderateScale(14),
    backgroundColor: '#fff',
    color: '#4a154b',
    minHeight: verticalScale(45),
  },
  smallTextInput: {
    padding: moderateScale(10),
    fontSize: moderateScale(12),
    minHeight: verticalScale(40),
    borderRadius: moderateScale(6),
  },
  tabletTextInput: {
    padding: moderateScale(15),
    fontSize: moderateScale(16),
    minHeight: verticalScale(55),
    borderRadius: moderateScale(10),
  },

  // Options Row
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(2),
  },
  optionButton: {
    flex: 1,
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(8),
    backgroundColor: '#f3f4f6',
    marginHorizontal: moderateScale(3),
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#4a154b',
    borderColor: '#4a154b',
  },
  optionButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#6b7280',
  },
  optionButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },

  // Continue Button
  continueButton: {
    backgroundColor: '#16a34a',
    padding: moderateScale(14),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: verticalScale(10),
    minHeight: verticalScale(45),
  },
  continueButtonDisabled: {
    backgroundColor: '#16a34a',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default RegisterProfessionalDetails;

