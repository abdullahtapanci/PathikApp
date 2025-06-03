import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
 
import Stars from '@/components/stars';

 type Props = {
    id: number;
    profileImage: string;
    name: string;
    text: string;
    written: string;
    visited: string;
    stars: number;
 };

 const screenWidth = Dimensions.get('window').width;
 const screenHeight = Dimensions.get('window').height;
 
 export default function comment({ id, profileImage, name, text, written, visited, stars }: Props) {
    return (
            <View style={styles.commentContainer }>
                <View style={styles.profileInfoContainer }>
                    <Image source={{ uri: profileImage }} style={styles.image} />
                    <Text style={styles.userName }>{name}</Text>
                </View>

                <Text style={styles.details}>{stars} <Stars rating={stars}  starSize={20} /></Text>

                <Text style={styles.commentText }>{text}</Text>

                <View style={styles.commentdateContainer }>
                    <Text style={styles.commentdate }>Written  {written}</Text>
                    <Text style={styles.commentdate }>Visited  {visited}</Text>
                </View>
                

            </View>
    );
 }
 
 const styles = StyleSheet.create({
    commentContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: 5,
        borderRadius: 20,
        margin: 10,
        padding: 3,
        backgroundColor: "#FFFFFF",
    },
    profileInfoContainer: {
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
    	width: screenWidth*0.15,
    	height: screenHeight*0.075,
    	borderRadius: 999,
        borderWidth: 2,
        borderColor: '#000000',
		resizeMode: 'cover',
        marginRight: 20,
  	},
    details: {
    	fontSize: 15,
    	color: '#555',
		paddingBottom: 3,
		paddingTop: 3,
        margin: 10,
  	},
    userName: {
        fontSize: 15,
        fontWeight: "bold",
    },
    commentText: {
        fontSize: 18,
        margin: 10,
    },
    commentdateContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    commentdate: {
        fontSize: 13,
    }
 });
 
 