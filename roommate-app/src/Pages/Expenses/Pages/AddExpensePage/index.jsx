// AddExpenseScreen.jsx

import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from "../../../../StateManagement/Slices/ExpensesSlice";
import Layout from './PageLayout';
import ExpenseDescriptionInput from './PageLayout/Components/ExpenseDescriptionInput';
import AmountInput from './PageLayout/Components/AmountInput';
import PaymentInfo from './PageLayout/Components/PaymentInfo';
import AddMembersButton from './PageLayout/Components/AddMembersButton';
import SelectedMembersDisplay from './PageLayout/Components/SelectedMembersDisplay';
import MembersModal from './PageLayout/Components/MembersModal';
import SplitPercentageModal from './PageLayout/Components/SplitPercentageModal';
import SaveExpenseButton from './PageLayout/Components/SaveExpenseButton';
import {useExpenses} from "../../Context";
import Ionicons from "react-native-vector-icons/Ionicons";

const AddExpenseScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const membersData = useSelector((state) => state.expenses.friends);
    const [amount, setAmount] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [splitModalVisible, setSplitModalVisible] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState(['You']);
    const [splitPercentages, setSplitPercentages] = useState({ You: '100' });
    const [splitType, setSplitType] = useState('equally');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (selectedMembers.length > 0) {
            const equalSplit = (100 / selectedMembers.length).toFixed(2);
            const initialSplits = selectedMembers.reduce((acc, member) => {
                acc[member] = equalSplit;
                return acc;
            }, {});
            setSplitPercentages(initialSplits);
            setSplitType('equally');
        }
    }, [selectedMembers]);

    const toggleMember = (member) => {
        if (selectedMembers.includes(member.id)) {
            setSelectedMembers(selectedMembers.filter((m) => m !== member.id));
            const updatedSplit = { ...splitPercentages };
            delete updatedSplit[member.name];
            setSplitPercentages(updatedSplit);
        } else {
            const newSelectedMembers = [...selectedMembers, member.id];
            setSelectedMembers(newSelectedMembers);

            // Recalculate equal split percentages
            const newSplit = 100 / newSelectedMembers.length;
            const updatedSplit = newSelectedMembers.reduce((acc, m) => {
                acc[m] = newSplit.toFixed(2);
                return acc;
            }, {});
            setSplitPercentages(updatedSplit);
        }
    };

    const saveExpense = () => {
        if (!amount || selectedMembers.length === 0 || !description) {
            Alert.alert("Incomplete Data", "Please enter an amount, description, and select at least one member.");
            return;
        }

        const expenseData = {
            description,
            amount: parseFloat(amount),
            splitPercentages: splitPercentages,
            splitType,
            date: new Date().toLocaleDateString(),
            members: selectedMembers,
        };

        dispatch(addExpense(expenseData));
        Alert.alert("Success", "Expense has been saved.");
        navigation.goBack();
    };

    return (
        <Layout>
            <Layout.Field>
                <ExpenseDescriptionInput value={description} onChangeText={setDescription} />
            </Layout.Field>
            <Layout.Field>
                <AmountInput value={amount} onChangeText={setAmount} />
            </Layout.Field>
            <Layout.Field>
                <PaymentInfo splitType={splitType}  onPressSplit={() => setSplitModalVisible(true)} />
            </Layout.Field>
            <Layout.Field>
                <AddMembersButton onPress={() => setModalVisible(true)} />
            </Layout.Field>
            <Layout.Field>
                <SelectedMembersDisplay selectedMembers={selectedMembers} membersData={membersData} />
            </Layout.Field>

            <Layout.ModalContainer visible={modalVisible} onClose={() => setModalVisible(false)}>
                <MembersModal
                    membersData={membersData}
                    selectedMembers={selectedMembers}
                    toggleMember={toggleMember}
                    onClose={() => setModalVisible(false)}
                />
            </Layout.ModalContainer>

            <Layout.ModalContainer visible={splitModalVisible} onClose={() => setSplitModalVisible(false)}>
                <SplitPercentageModal
                    selectedMembers={selectedMembers}
                    membersData={membersData}
                    splitPercentages={splitPercentages}
                    setSplitPercentages={setSplitPercentages}
                    onClose={() => setSplitModalVisible(false)}
                />
            </Layout.ModalContainer>

            <Layout.Field>
                <SaveExpenseButton onPress={saveExpense} />
            </Layout.Field>
        </Layout>
    );
};

export default AddExpenseScreen;
