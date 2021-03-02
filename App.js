import React, { useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  Modal,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import Slider from 'rn-range-slider';
import { format } from 'date-fns';
import {
  getUniqueId,
  getManufacturer,
  getBatteryLevel,
  getAndroidId,
  getDeviceId,
  getBrand,
  getDeviceType,
  getBundleId,
  getDisplay,
  isCameraPresent,
  getCarrier,
  getFirstInstallTime,
  getFontScale,
  getFreeDiskStorage,
  getHost,
  getIpAddress,
  getModel,
  getSystemVersion,
  getTotalMemory,
  isHeadphonesConnected,
  getTotalDiskCapacity,
} from 'react-native-device-info';

import Thumb from './components/Thumb';
import Rail from './components/Rail';
import RailSelected from './components/RailSelected';
import Notch from './components/Notch';
import Label from './components/Label';
import CustomButton from './components/Button';

const initialState = {};

const ACTIONS = {
  SET_PLATFORM_DATA: 'SET_PLATFORM_DATA',
  SET_BATTERY_LEVEL: 'SET_BATTERY_LEVEL',
  SET_ANDROID_OD: 'SET_ANDROID_ID',
  SET_DEVICE_TYPE: 'SET_DEVICE_TYPE',
  SET_BRAND: 'SET_BRAND',
  SET_DEVICE_ID: 'SET_DEVICE_ID',
  SET_DISPLAY: 'SET_DISPLAY',
  SET_BUNDLE_ID: 'SET_BUNDLE_ID',
  SET_IS_CAMERA_PRESENT: 'SET_IS_CAMERA_PRESENT',
  SET_CARRIER_NAME: 'SET_CARRIER_NAME',
  SET_DEVICE: 'SET_DEVICE',
  SET_FIRST_INSTALL_TIME: 'SET_FIRST_INSTALL_TIME',
  SET_FONT_SCALE: 'SET_FONT_SCALE',
  SET_FREE_DISK_STORAGE: 'SET_FREE_DISK_STORAGE',
  SET_HOST: 'SET_HOST',
  SET_IP: 'SET_IP',
  SET_MANUFACTURER: 'SET_MANUFACTURER',
  SET_MODEL: 'SET_MODEL',
  SET_SYSTEM_VERSION: 'SET_SYSTEM_VERSION',
  SET_TOTAL_MEMORY: 'SET_TOTAL_MEMORY',
  SET_UNIQUE_ID: 'SET_UNIQUE_ID',
  SET_USER_AGENT: 'SET_USER_AGENT',
  SET_IS_HEADPHONES: 'SET_IS_HEADPHONES',
  SET_TOTAL_DISK_CAPACITY: 'SET_TOTAL_DISK_CAPACITY',
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_PLATFORM_DATA: {
      return {
        ...state,
        OS: action.payload.os,
      }
    }

    case ACTIONS.SET_BATTERY_LEVEL: {
      return {
        ...state,
        ['Battery level']: `${Math.floor(action.payload * 100)} %`,
      }
    }

    case ACTIONS.SET_ANDROID_OD: {
      return {
        ...state,
        ['Android id']: action.payload,
      }
    }

    case ACTIONS.SET_DEVICE_TYPE: {
      return {
        ...state,
        ['Device type']: action.payload,
      }
    }

    case ACTIONS.SET_BRAND: {
      return {
        ...state,
        Brand: action.payload,
      }
    }

    case ACTIONS.SET_DEVICE_ID: {
      return {
        ...state,
        ['Device id']: action.payload,
      }
    }

    case ACTIONS.SET_DISPLAY: {
      return {
        ...state,
        ['Display']: action.payload,
      }
    }

    case ACTIONS.SET_BUNDLE_ID: {
      return {
        ...state,
        ['Bundle id']: action.payload,
      }
    }

    case ACTIONS.SET_IS_CAMERA_PRESENT: {
      return {
        ...state,
        ['Device has camera']: action.payload.toString(),
      }
    }

    case ACTIONS.SET_CARRIER_NAME: {
      return {
        ...state,
        ['Carrier name']: action.payload,
      }
    }

    case ACTIONS.SET_FIRST_INSTALL_TIME: {
      return {
        ...state,
        ['App was installed at']: format(action.payload, 'dd-mm-yyyy HH:MM'),
      }
    }

    case ACTIONS.SET_FONT_SCALE: {
      return {
        ...state,
        ['Device`s font scale']: action.payload,
      }
    }

    case ACTIONS.SET_FREE_DISK_STORAGE: {
      return {
        ...state,
        ['Disk storage free, bytes']: action.payload,
      }
    }

    case ACTIONS.SET_TOTAL_DISK_CAPACITY: {
      return {
        ...state,
        ['Disk storage total, bytes']: action.payload,
      }
    }

    case ACTIONS.SET_HOST: {
      return {
        ...state,
        ['Host name']: action.payload,
      }
    }

    case ACTIONS.SET_IP: {
      return {
        ...state,
        ['Ip address']: action.payload,
      }
    }

    case ACTIONS.SET_MANUFACTURER: {
      return {
        ...state,
        ['Manufacturer']: action.payload,
      }
    }

    case ACTIONS.SET_MODEL: {
      return {
        ...state,
        ['Device model']: action.payload,
      }
    }

    case ACTIONS.SET_SYSTEM_VERSION: {
      return {
        ...state,
        ['Device system version']: action.payload,
      }
    }

    case ACTIONS.SET_TOTAL_MEMORY: {
      return {
        ...state,
        ['Memory total, bytes']: action.payload,
      }
    }

    case ACTIONS.SET_UNIQUE_ID: {
      return {
        ...state,
        ['Device unique id']: action.payload,
      }
    }

    case ACTIONS.SET_IS_HEADPHONES: {
      return {
        ...state,
        ['Headphones connected']: action.payload.toString(),
      }
    }

    default: {
      return state;
    }
  }
}

export default function App() {
  const [isVisible,setIsVisible] = useState(false)
  const [isCustomizeModal,setIsCustomizeModal] = useState(false)
  const [buttonColor, setButtonColor] = useState('#4267B2');
  const [buttonLabel, setButtonLabel] = useState('Show user data');
  const [buttonWidth, setButtonWidth] = useState(50);

  const [state, dispatch] = useReducer(reducer, initialState, () => initialState);

  useEffect(() => {
    getBatteryLevel().then(batteryLevel => dispatch({ type: ACTIONS.SET_BATTERY_LEVEL, payload: batteryLevel}));
    getAndroidId().then(id => dispatch({ type: ACTIONS.SET_ANDROID_OD, payload: id}));
    getDisplay().then(display => dispatch({ type: ACTIONS.SET_DISPLAY, payload: display }))
    isCameraPresent().then(data => dispatch({ type: ACTIONS.SET_IS_CAMERA_PRESENT, payload: data }))
    isHeadphonesConnected().then(data => dispatch({ type: ACTIONS.SET_IS_HEADPHONES, payload: data }))
    getCarrier().then(data => dispatch({ type: ACTIONS.SET_CARRIER_NAME, payload: data }))
    getFirstInstallTime().then(data => dispatch({ type: ACTIONS.SET_FIRST_INSTALL_TIME, payload: data }))
    getFontScale().then(data => dispatch({ type: ACTIONS.SET_FONT_SCALE, payload: data }))
    getFreeDiskStorage().then(data => dispatch({ type: ACTIONS.SET_FREE_DISK_STORAGE, payload: data }))
    getTotalDiskCapacity().then(data => dispatch({ type: ACTIONS.SET_TOTAL_DISK_CAPACITY, payload: data }))
    getHost().then(data => dispatch({ type: ACTIONS.SET_HOST, payload: data }))
    getIpAddress().then(data => dispatch({ type: ACTIONS.SET_IP, payload: data }))
    getManufacturer().then(data => dispatch({ type: ACTIONS.SET_MANUFACTURER, payload: data }))
    getTotalMemory().then(data => dispatch({ type: ACTIONS.SET_TOTAL_MEMORY, payload: data }))

    const systemVersion = getSystemVersion();
    if(systemVersion) {
      dispatch({ type: ACTIONS.SET_SYSTEM_VERSION, payload: systemVersion })
    }

    const uniqueId = getUniqueId();
    if(uniqueId) {
      dispatch({ type: ACTIONS.SET_UNIQUE_ID, payload: uniqueId })
    }

    const model = getModel();
    if(model) {
      dispatch({ type: ACTIONS.SET_MODEL, payload: model })
    }

    const devType = getDeviceType();
    if(devType) {
      dispatch({ type: ACTIONS.SET_DEVICE_TYPE, payload: devType })
    }

    const brandName = getBrand();
    if(brandName) {
      dispatch({ type: ACTIONS.SET_BRAND, payload: brandName })
    }

    const deviceId = getDeviceId();
    if(deviceId) {
      dispatch({ type: ACTIONS.SET_DEVICE_ID, payload: deviceId })
    }

    const bundleId = getBundleId();
    if(bundleId) {
      dispatch({ type: ACTIONS.SET_BUNDLE_ID, payload: bundleId })
    }
    },[])

  useEffect(() => {
    if(!Platform) return;

    dispatch({ type: ACTIONS.SET_PLATFORM_DATA, payload: { os: Platform.OS }});
  }, [Platform])


  const closeModal = () => setIsVisible(false);

  const rows = useMemo(() => Object.entries(state).filter(info => !!info[1]).sort(), [state]);

  const renderThumb = useCallback(() => <Thumb/>, []);
  const renderRail = useCallback(() => <Rail/>, []);
  const renderRailSelected = useCallback(() => <RailSelected/>, []);
  const renderNotch = useCallback(() => <Notch/>, []);
  const renderLabel = useCallback(value => <Label text={`${buttonWidth} %`}/>, [buttonWidth]);
  const handleValueChange = useCallback((value) => {
    setButtonWidth(value);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomButton onPress={() => setIsVisible(true)} color={buttonColor} width={buttonWidth} label={buttonLabel}/>
      <TouchableOpacity onPress={() => setIsCustomizeModal(true)} style={styles.customizeButton}>
        <Text>Customize button</Text>
      </TouchableOpacity>
      <Modal
        visible={isVisible}
        onRequestClose={closeModal}
        animationType={'fade'}
      >
        <View style={styles.centeredView}>
          <View style={styles.closeButton}>
            <Button title={'X'}  onPress={closeModal}/>
          </View>
          <Text style={styles.title}>User data</Text>
          <ScrollView contentContainerStyle={styles.contentView}>
            {rows.map(info => (
              <View style={styles.row} key={info[0]}>
                <Text>{info[0]}</Text>
                <Text style={styles.value}>{info[1]}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
      <Modal
        visible={isCustomizeModal}
        onRequestClose={() => setIsCustomizeModal(false)}
        animationType={'fade'}
      >
        <View style={styles.closeButton}>
          <Button title={'X'}  onPress={() => setIsCustomizeModal(false)}/>
        </View>
        <ScrollView contentContainerStyle={styles.customizeModalContainer}>
          <CustomButton onPress={() => alert('You short-pressed the button!')} color={buttonColor} width={buttonWidth} label={buttonLabel}/>
          <View style={[styles.blockStyle, styles.colorPicker]}>
            <Text style={styles.customizeTitle}>Change background</Text>
            <ColorPicker
              onColorSelected={setButtonColor}
              style={styles.colorPickerStyle}
            />
          </View>
          <View style={styles.blockStyle}>
            <Text style={styles.customizeTitle}>Change label</Text>
            <TextInput
              onChangeText={setButtonLabel}
              value={buttonLabel} style={styles.input}
            />
          </View>
          <View style={styles.blockStyle}>
            <Text style={styles.customizeTitle}>Change button width</Text>
            <Slider
              style={styles.slider}
              min={10}
              max={100}
              step={1}
              floatingLabel
              disableRange
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderNotch={renderNotch}
              renderLabel={renderLabel}
              onValueChanged={handleValueChange}
              low={buttonWidth}
              high={buttonWidth}
            />
          </View>
          <View style={styles.blockStyle}>
            <Text style={styles.customizeTitle}>Try also to long-press the button</Text>
            <Text style={styles.customizeTitle}>Try also to short-press the button</Text>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customizeModalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  contentView: {
    marginHorizontal: 20,
    paddingBottom: 30,
    maxWidth: '80%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingVertical: 10
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    paddingLeft: 20
  },
  customizeTitle: {
    alignSelf: 'flex-start'
  },
  blockStyle: {
    width: '100%',
    padding: 20,
  },
  colorPicker: {
    flex: 1,
  },
  colorPickerStyle: {
    flex: 1,
    width: '100%',
  },
  customizeButton: {
    padding: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
});
