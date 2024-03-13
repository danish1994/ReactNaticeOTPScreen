import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useCallback, useRef, useState} from "react";


const digitStyle = {borderWidth: 1, borderColor: 'red', margin: 10};
const length = 6;
//
// function Digit(
//     {
//         value,
//         index,
//         onCodeChange,
//         setRef
//     }
// ) {
//     const onChange = useCallback((value) => {
//         onCodeChange(value, index);
//     }, [index, onCodeChange]);
//
//     const setDigitRef = useCallback((ref) => {
//         setRef(ref, index);
//     }, [index, onCodeChange]);
//
//     return <TextInput
//         text
//         style={digitStyle}
//         ref={setDigitRef}
//         value={value}
//         onChangeText={onChange}
//     />
// }

function Code(
    {
        code,
        setCode
    }
) {
    const codeRef = useRef([]);

    const onCodeChange = useCallback((text, index) => {
        if (text.length >= length) {
            const newCode = text.split('').slice(0, length);
            console.log(newCode);
            setCode(newCode);
        } else {
            const newCode = [...code];
            newCode[index] = text.charAt(text.length - 1) || '';
            if (newCode[index] !== '') {
                if (index < length - 1) {
                    codeRef.current[index + 1]?.focus()
                }
            }

            if (newCode[index] === '') {
                if (newCode[index - 1] !== '') {
                    codeRef.current[index - 1]?.focus()
                }
            }
            console.log(newCode);
            setCode(newCode);
        }
    }, [code, setCode]);

    const setRef = useCallback((curRef, index) => {
        codeRef.current[index] = curRef;
    }, [])

    return <View>
        {
            code
                .map((value, index) =>
                    <TextInput
                        key={index}
                        style={digitStyle}
                        ref={(ref) => setRef(ref, index)}
                        value={value}
                        onChangeText={(value) => onCodeChange(value, index)}
                    />
                )
        }
    </View>
}

export default function App() {
    const [code, setCode] = useState(Array.from({length}).map(() => ''));
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
});
