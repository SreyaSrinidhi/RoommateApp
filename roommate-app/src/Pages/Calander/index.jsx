import React, { useState } from 'react';
import CalenderEventModal from './PageLayout/Components/CalendarEventModal';
import AddEventModal from "./PageLayout/Components/AddEventModal";
import Layout from './PageLayout';
import CalendarWidget from "./PageLayout/Components/CalendarWidget";
import Tasks from "./PageLayout/Components/Tasks"; // Import the Layout component


const CalendarPage = ({ navigation }) => {

    // Initial example tasks for specific dates
    const [tasks, setTasks] = useState({
        '2024-10-17': [
            { title: 'PHYS 121 Labs', subtitle: 'Lab #4: COL', description: 'Complete the lab report for COL', due: 'Due at 11:59 PM', created: "User X" },
            { title: 'PHYS 122 Labs', subtitle: 'Lab #5: COL', description: 'Complete the lab report for COL', due: 'Due at 1:59 PM', created: "User Y" },
        ],
        '2024-10-24': [
            { title: 'PHYS 122 Labs', subtitle: 'Lab #4: COL', description: 'Complete the lab report for COL', due: 'Due at 1:59 PM', created: "User Y" },
        ],
    });


    return (
        <Layout testID='calendar-main-page'>
            <Layout.CalendarSection>
                <CalendarWidget/>
            </Layout.CalendarSection>


            <Layout.ScrollSection>
                <Tasks tasks={tasks} />
            </Layout.ScrollSection>

            <Layout.ExpandEventModal>
                <CalenderEventModal/>
            </Layout.ExpandEventModal>

            <Layout.AddEventModal navigation={navigation}>
                <AddEventModal/>
            </Layout.AddEventModal>
        </Layout>
    );
};

export default CalendarPage;