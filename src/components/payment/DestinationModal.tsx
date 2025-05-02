import React, { FC, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../utils/colors';
import { Text } from '../../theme/CustomText';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';


interface destination {
  id: string;
  label: string;
}

interface DestinationModalProps {
  visible: boolean;
  onClose: () => void;
  tabBarHeight?: number;
  destinations: destination[];
  handleDestinationSelect: (id: string) => void;
  selectedDestination: string | null;
  label: string;
}

const DestinationModal: FC<DestinationModalProps> = ({
  visible,
  onClose,
  tabBarHeight,
  destinations,
  handleDestinationSelect,
  selectedDestination,
  label
}) => {

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
      backdropColor='rgba(0, 0, 0, 0.35)'
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={onClose}
      >
        <BlurView
          style={styles.blurView}
          blurType="dark"
          // blurAmount={10}
          blurAmount={1}
          reducedTransparencyFallbackColor="white"
        />
      </Pressable>

      <View
        style={[styles.modalContent, {
          marginBottom: tabBarHeight ? tabBarHeight - 20 : 20
        }]}
      >
        <View style={styles.holder} />
        <Text style={styles.modalTitle}>{label}</Text>

        {destinations?.map((dest, index) => (
          <TouchableOpacity
            key={dest.id}
            style={styles.destinationOption}
            onPress={() => handleDestinationSelect(dest.id)}
          >
            {/* <View style={styles.radioButton}>
              {selectedDestination === dest.id && (
                <View style={styles.radioButtonSelected} />
              )}
            </View> */}
            <TouchableOpacity
              style={styles.iconContainer}
            // onPress={() => setModalVisible(true)}
            >
              {/* {index == 3 && <Ionicons name="add" size={16} color="#00A5D1" />}
              {index == 2 && <Feather name="at-sign" size={16} color="#00A5D1" />}
              {index == 1 && <Feather name="user-check" size={16} color="#00A5D1" />}
              {index == 0 && <MaterialCommunityIcons name="bank-outline" size={16} color="#00A5D1" />} */}

              {dest.label.includes('contact') && <Ionicons name="add" size={16} color="#00A5D1" />}
              {dest.label.includes('tag') && <Feather name="at-sign" size={16} color="#00A5D1" />}
              {dest.label.includes('beneficiary') && <Feather name="user-check" size={16} color="#00A5D1" />}
              {dest.label.includes('bank') && <MaterialCommunityIcons name="bank-outline" size={16} color="#00A5D1" />}
            </TouchableOpacity>
            <Text style={styles.destinationText}>{dest.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.screen,
    marginTop: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20
  },
  holder: {
    width: 38,
    height: 5,
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    marginTop: 0,
    borderRadius: 5,
    marginBottom: 25
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 18,
    backgroundColor: '#CCF4FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 0,
    marginTop: 'auto',
  },
  modalTitle: {
    fontSize: 15,
    fontFamily: 'ClashGrotesk-Medium',
    marginBottom: 5,
    color: Colors.accent,
  },
  destinationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0066FF',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0066FF',
  },
  destinationText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DestinationModal;