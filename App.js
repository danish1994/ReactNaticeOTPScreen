import {StyleSheet, TextInput, View} from 'react-native';
import {useCallback, useRef, useState} from "react";

const CODE_LENGTH = 6;

function Code(
    {
        code,
        setCode
    }
) {
    const codeRef = useRef([]);

    const onCodeChange = useCallback((text, index) => {
        text = text.replace(/[^0-9]/g, '');
        
        if (text.length >= CODE_LENGTH) {
            const newCode = text.split('').slice(0, length);
            setCode(newCode);
        } else {
            const newCode = [...code];
            newCode[index] = text.charAt(text.length - 1) || '';
            if (newCode[index] !== '') {
                if (index < CODE_LENGTH - 1) {
                    codeRef.current[index + 1]?.focus()
                }
            }

            if (newCode[index] === '') {
                if (newCode[index - 1] !== '') {
                    codeRef.current[index - 1]?.focus()
                }
            }
            setCode(newCode);
        }
    }, [code, setCode]);

    const setRef = useCallback((curRef, index) => {
        codeRef.current[index] = curRef;
    }, [])

    return <View
        style={styles.code}
    >
        {
            code
                .map((value, index) =>
                    <TextInput
                        key={index}
                        keyboardType={'numeric'}
                        style={styles.digit}
                        ref={(ref) => setRef(ref, index)}
                        value={value}
                        onChangeText={(value) => onCodeChange(value, index)}
                    />
                )
        }
    </View>
}

export default function App() {
    const [code, setCode] = useState(Array.from({length: CODE_LENGTH}).map(() => ''));
    return (
        <View style={styles.container}>
            <Code code={code} setCode={setCode}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    code: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 20,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    digit: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#808080',
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(100,100,100,0.125)',
        textAlign: 'center',
        width: 50,
        height: 50,
        fontWeight: 'bold'
    }
});
