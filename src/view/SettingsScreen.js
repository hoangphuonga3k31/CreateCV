import {
    Text,
    View,
    TouchableOpacity,
    ScrollView, 
    Switch,

  } from "react-native";
import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {useState, useEffect} from 'react';

import AuthContext from "../../AuthContext";

function SettingsScreen({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const [isEnabledLockApp, setEnabledLockApp] = useState(true)
  const [isUseFingerprint, setUseFingerprint] = useState(false)
  const [isEnabledChangePassword, setEnabledChangePassword] = useState(true)
    return (
      <View>
        {/* <Text>Setting!</Text>

        <TouchableOpacity onPress={() => {
          navigation.navigate('UpdateInfoScreen');
        }}>
          <View style={{width: 100,heigh: 50, backgroundColor: "orange", display: "flex", justifyContent: "center", alignItems: "center", margin: 10}}>
            <Text>Update Info</Text>
          </View>
        </TouchableOpacity> */}

        
        

        <Text style={{fontSize: 20, marginStart: 10, }}>SETTING</Text>
        <ScrollView>
            <View style={{
                height: 40,
                backgroundColor: 'rgba(0,0,0,0.2)',    
                justifyContent: 'center',            
            }}>
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Common</Text>                
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='globe'
                    style={{ marginStart: 10 }}
                    size={20} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Language</Text>                
                <View style={{flex: 1}} />
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingEnd: 10,
                    opacity: 0.5,
                }}>English</Text> 
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='cloud'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Environment</Text>                
                <View style={{flex: 1}} />
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingEnd: 10,
                    opacity: 0.5,
                }}>Production</Text> 
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </View>
            <View style={{
                height: 40,
                backgroundColor: 'rgba(0,0,0,0.2)',    
                justifyContent: 'center',            
            }}>
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Account</Text>                
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Edit Personal Information')}>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='envelope'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Edit personal information</Text>                
                <View style={{flex: 1}} />                
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("clicked")}>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='envelope'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Applied jobs</Text>                
                <View style={{flex: 1}} />                
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={{
                flexDirection: 'row',
                paddingVertical: 10,                
                alignItems: 'center',
            }} onPress={signOut}>
                <Icon
                    name='sign-out-alt'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Sign out</Text>                
                <View style={{flex: 1}} />                
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </TouchableOpacity>
            <View style={{
                height: 40,
                backgroundColor: 'rgba(0,0,0,0.2)',    
                justifyContent: 'center',            
            }}>
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Security</Text>                
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='door-closed'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Lock app in background</Text>                
                <View style={{flex: 1}} /> 
                <Switch
                    
                    //ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>{
                        setEnabledLockApp(!isEnabledLockApp)
                    }}
                    value={isEnabledLockApp}
                    style={{marginEnd: 10}}
                />                               
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='fingerprint'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Use fingerprint</Text>                
                <View style={{flex: 1}} /> 
                <Switch
                    
                    //ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>{
                        setUseFingerprint(!isUseFingerprint)
                    }}
                    value={isUseFingerprint}
                    // style={{marginEnd: 10}}
                />                               
            </View>
            <TouchableOpacity onPress={() => console.log("clicked")}>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='envelope'
                    style={{ marginStart: 10 }}
                    size={16} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Change password</Text>                
                <View style={{flex: 1}} />                
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </View>
            </TouchableOpacity>
            <View style={{
                height: 40,
                backgroundColor: 'rgba(0,0,0,0.2)',    
                justifyContent: 'center',            
            }}>
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Misc</Text>                
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='file-alt'
                    style={{ marginStart: 10 }}
                    size={20} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Term of Service</Text>                
                <View style={{flex: 1}} />                
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center'
            }}>
                <Icon
                    name='passport'
                    style={{ marginStart: 10 }}
                    size={20} color={'black'}
                />
                <Text style={{
                    color:'black',
                    fontSize: 16,
                    paddingStart: 10,
                }}>Open source licenses</Text>                
                <View style={{flex: 1}} />                
                <Icon
                    name='chevron-right'
                    style={{ 
                        paddingEnd: 10,
                        opacity: 0.5,
                    }}
                    size={20} color={'black'}
                />
            </View>
        </ScrollView>
      </View>
    );
  }

export default SettingsScreen