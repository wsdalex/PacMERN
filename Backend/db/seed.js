const mongoose = require("mongoose");
const User = require("../models/user");
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const { connectToDatabase } = require("./db");
require("dotenv").config();

async function seed() {
    try {
        await connectToDatabase();

        // Clear existing data
        await User.deleteMany({});
        await Conversation.deleteMany({});
        await Message.deleteMany({});

        // Create users
        const users = await User.create([
            {
                name: "Alice",
                email: "a@a.com",
                password: "p",
                profileImage: "https://www.ocregister.com/wp-content/uploads/migration/m37/m37zui-b78946761z.120120428194535000g3j17bhpl.2.jpg?w=535",
            },
            {
                name: "Bob",
                email: "b@b.com",
                password: "p",
                profileImage: "https://www.azcentral.com/gcdn/presto/2020/06/12/PPHX/e7207da9-6fbe-467b-b63e-ac44e95db582-BobsBurgers_2019_KeyPoses_Bob_1.jpg?crop=3356,1888,x0,y480&width=660&height=372&format=pjpg&auto=webp",
            },
            {
                name: "Charlie",
                email: "c@c.com",
                password: "p",
                profileImage: "https://m.media-amazon.com/images/M/MV5BNWQ2Yzg1MDgtZWVhMC00YjI1LThhNTEtOWE2NWRiZWM5Mjg0XkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg",
            },
            {
                name: "Diana Prince",
                email: "diana@amazon.com",
                password: "p",
                profileImage: "",
            },
            {
                name: "Ethan Hunt",
                email: "ethan@impossible.com",
                password: "p",
                profileImage: "",
            },
            {
                name: "Fiona Shrek",
                email: "fiona@farfaraway.com",
                password: "p",
                profileImage: "",
            },
            {
                name: "Gandalf Grey",
                email: "gandalf@middleearth.com",
                password: "p",
                profileImage: "",
            },
            {
                name: "Hermione Granger",
                email: "hermione@hogwarts.edu",
                password: "p",
                profileImage: "",
            },
            {
                name: "Indiana Jones",
                email: "indy@archaeology.edu",
                password: "p",
                profileImage: "",
            },
            {
                name: "Jane Austen",
                email: "jane@prideandprejudice.com",
                password: "p",
                profileImage: "",
            },
            {
                name: "King Arthur",
                email: "arthur@camelot.gov",
                password: "p",
                profileImage: "",
            },
            {
                name: "Lara Croft",
                email: "lara@tombraider.com",
                password: "p",
                profileImage: "",
            }
        ]);

        console.log("Users created:", users);

        // Create conversations
        const conversations = await Conversation.create([
            { senderId: users[0]._id, receiverId: users[1]._id },
            { senderId: users[0]._id, receiverId: users[2]._id },
            { senderId: users[1]._id, receiverId: users[2]._id },
        ]);

        console.log("Conversations created:", conversations);

        // Create messages
        const messages = await Message.create([
            // Conversation between Alice and Bob
            {
                sender: users[0]._id,
                receiver: users[1]._id,
                conversation: conversations[0]._id,
                message: "Hey Bob, how are you?",
            },
            {
                sender: users[1]._id,
                receiver: users[0]._id,
                conversation: conversations[0]._id,
                message: "Hi Alice! I'm doing great, thanks for asking.",
            },
            {
                sender: users[0]._id,
                receiver: users[1]._id,
                conversation: conversations[0]._id,
                message: "Glad to hear that! Do you want to grab coffee later?",
            },
            {
                sender: users[1]._id,
                receiver: users[0]._id,
                conversation: conversations[0]._id,
                message: "Sure, that sounds great! How about 3 PM at the usual place?",
            },
            {
                sender: users[0]._id,
                receiver: users[1]._id,
                conversation: conversations[0]._id,
                message: "Perfect, see you then!",
            },

            // Conversation between Alice and Charlie
            {
                sender: users[0]._id,
                receiver: users[2]._id,
                conversation: conversations[1]._id,
                message: "Charlie, do you want to grab lunch later?",
            },
            {
                sender: users[2]._id,
                receiver: users[0]._id,
                conversation: conversations[1]._id,
                message: "Hey Alice, that sounds good! What time were you thinking?",
            },
            {
                sender: users[0]._id,
                receiver: users[2]._id,
                conversation: conversations[1]._id,
                message: "How about 12:30 PM at the new Italian place?",
            },
            {
                sender: users[2]._id,
                receiver: users[0]._id,
                conversation: conversations[1]._id,
                message: "Sounds delicious! I'll meet you there.",
            },

            // Conversation between Bob and Charlie
            {
                sender: users[1]._id,
                receiver: users[2]._id,
                conversation: conversations[2]._id,
                message: "Hey Charlie, Alice and I are getting lunch. Want to join?",
            },
            {
                sender: users[2]._id,
                receiver: users[1]._id,
                conversation: conversations[2]._id,
                message: "Hi Bob! Thanks for the invite, but I already have plans with Alice.",
            },
            {
                sender: users[1]._id,
                receiver: users[2]._id,
                conversation: conversations[2]._id,
                message: "No worries! Maybe we can all get together this weekend?",
            },
            {
                sender: users[2]._id,
                receiver: users[1]._id,
                conversation: conversations[2]._id,
                message: "That's a great idea! Let's plan something.",
            },
            {
                sender: users[1]._id,
                receiver: users[2]._id,
                conversation: conversations[2]._id,
                message: "Awesome, I'll create a group chat and we can figure out the details.",
            },
        ]);
        
        console.log("Messages created:", messages);

        // Update last messages in conversations
        await Conversation.findByIdAndUpdate(conversations[0]._id, {
            lastMessage: messages[4]._id,
        });
        await Conversation.findByIdAndUpdate(conversations[1]._id, {
            lastMessage: messages[8]._id,
        });
        await Conversation.findByIdAndUpdate(conversations[2]._id, {
            lastMessage: messages[13]._id,
        });

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
}

seed();