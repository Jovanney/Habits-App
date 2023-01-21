import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { BackButton } from "../componentes/BackButton";
import { Checkbox } from "../componentes/Checkbox";
import { Feather} from '@expo/vector-icons'
import colors from "tailwindcss/colors";

const avaibleWeekDays= ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta', 'Sábado']; 

export function New(){
    const [weekDays, setWeekDays] = useState<number[]>([]);
    const [title, setTitle] = useState('');
    
    function handleToggle(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay != weekDayIndex))
        }else{
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }

    return(
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
               
                <BackButton/>

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar Hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput
                 className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-violet-600" placeholder="Exercícios, Dormir bem, etc.." placeholderTextColor={colors.zinc[400]}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência ?
                </Text>
                
            
                {
                    avaibleWeekDays.map((weekDay, index) => (
                        <Checkbox
                        key={weekDay}
                        title={weekDay}
                        checked={weekDays.includes(index)}
                        onPress={() => handleToggle(index)}
                        />
                    ))
                }

                <TouchableOpacity className="w-full h-14 flex-row justify-center items-center bg-violet-600 rounded-md mt-6" activeOpacity={0.7}>
                    <Feather
                    name="check"
                    size={20}
                    color={colors.white}
                    />
                    <Text className="font-semibold text-base text-white  ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}