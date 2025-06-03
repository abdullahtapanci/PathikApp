import { StyleSheet, View, Pressable, Text } from 'react-native';

type Props = {
	label?: string;
	bgColor?: string;
	textColor?: string;
	onPress?: () => void;
	children?: React.ReactNode;
};

export default function Button({ label, bgColor= "#35E0A1", textColor= "#FFFFFF", onPress= () => {}, children }: Props) {
	return (
    		<View style={styles.buttonContainer }>
      			<Pressable style={[styles.button, { backgroundColor: bgColor, }]} onPress={onPress}>
					{children ? (
						children
					) : (
						<Text style={[styles.buttonLabel, { color: textColor }]}>{label}</Text>
					)}
      			</Pressable>
    		</View>
  	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		alignItems: 'flex-start',
	    justifyContent: 'center',
		padding: 3,
		marginVertical: 5,
  	},
  	button: {
    	borderRadius: 999,
		paddingVertical: 12,
		paddingHorizontal: 24,
    	alignItems: 'center',
    	justifyContent: 'center',
    	flexDirection: 'row',
  	},
	buttonLabel: {
    	fontSize: 16,
		fontWeight: 'bold'
  	},
});

