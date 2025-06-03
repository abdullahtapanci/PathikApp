import { StyleSheet, View, Image, Text, Dimensions, Pressable } from 'react-native';

type Props = {
    id: number;
    label: string;
    img: string;
    max: number;
    done: number;
    explaination: string;
    onPress?: () => void;
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Badges({label, img, max, done, explaination, onPress}: Props) {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.badgesContainer }>
                <View>
                    <Image source={typeof img === 'string' ? { uri: img } : img} style={styles.image} />
                </View>
                <Text style={{fontWeight: "bold", fontSize: 20}}>{done}/{max}</Text>
                <Text style={{fontWeight: "bold", fontSize: 20}}>{label}</Text>
                <Text>{explaination}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    badgesContainer: {
        width: screenWidth*0.5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginVertical: 10,
    },
    image: {
        width: screenWidth*0.15,
        height: screenHeight*0.06,
        borderWidth: 2,
        borderRadius: 999,
        resizeMode: 'cover',
  },
});

