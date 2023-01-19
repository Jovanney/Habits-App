import { ActivityIndicator, View } from "react-native";

export const Loading = ()=> {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignContent: "center", backgroundColor: "#1E1E1E"}}>
            <ActivityIndicator color="#7C3AED"/>
        </View>
    );
}