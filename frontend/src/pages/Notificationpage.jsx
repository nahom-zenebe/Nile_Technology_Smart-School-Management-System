
import { useState } from "react"
import { FiSearch, FiBell, FiStar, FiFile, FiTrash2, FiMoreHorizontal, FiChevronDown, FiCheck } from "react-icons/fi"
import TopNavbar from "../../../frontend/src/components/Topnavbar";
import man5 from "../assets/man1.webp";
 function Notificationpage() {
  const [activeTab, setActiveTab] = useState("all")

  
  function renderNotification() {
    const id=23
    const isStarred=true
    const message="welcome to shcool managment system" 
    const time="2025"
    const isRead=true
    return (
        <>
  
 
      <div key={id} className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50">
        {isRead ? (
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
        ) : (
          <div className="w-2 h-2 opacity-0 mr-2"></div>
        )}

<img
                className="border-4  border-blue-500 h-10 w-10 rounded-full object-cover shadow-lg"
                src={man5}
                alt="Profile"
              />

        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md mr-3">
          <FiFile className="w-4 h-4 text-gray-600" />
        </div>

        <div className="flex-1 text-sm text-gray-700">{message}</div>
        <div className="text-xs text-gray-400 mr-3">{time}</div>

        <button className="p-2 text-red-400 hover:bg-red-50 rounded-full">
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
      </>
    )
  }

  return (
    <>
          <TopNavbar className="mb-10"/>
     
    <div className="mx-10 mt-10  rounded-lg shadow-sm">
    
      


      <div className="flex items-center justify-between p-4 bg-gray-200">
        <div className="flex items-center">
          <FiBell className="text-gray-700 mr-2" />
          <h2 className="text-lg font-medium text-gray-800">List Notification</h2>
        </div>
        
      </div>

      {/* Notification Count */}
      <div className="flex justify-between items-center p-4">
        <div className="text-gray-700 font-medium">188 Notification</div>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name title"
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-80 focus:outline-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex items-center px-4 py-2 border-b-2 ${activeTab === "all" ? "border-red-400 text-red-500" : "border-transparent text-gray-500"}`}
          onClick={() => setActiveTab("all")}
        >
          <span
            className={`px-2 py-0.5 rounded-full text-xs mr-2 ${activeTab === "all" ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-500"}`}
          >
            20
          </span>
          All
        </button>
        <button
          className={`flex items-center px-4 py-2 border-b-2 ${activeTab === "archive" ? "border-red-400 text-red-500" : "border-transparent text-gray-500"}`}
          onClick={() => setActiveTab("archive")}
        >
          <span
            className={`px-2 py-0.5 rounded-full text-xs mr-2 ${activeTab === "archive" ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-500"}`}
          >
            10
          </span>
          Archive
        </button>
        <button
          className={`flex items-center px-4 py-2 border-b-2 ${activeTab === "favorite" ? "border-red-400 text-red-500" : "border-transparent text-gray-500"}`}
          onClick={() => setActiveTab("favorite")}
        >
          <span
            className={`px-2 py-0.5 rounded-full text-xs mr-2 ${activeTab === "favorite" ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-500"}`}
          >
            17
          </span>
          Favorite
        </button>
      </div>

      {/* Notification List */}
      <div className="overflow-y-auto max-h-[600px]">
        {renderNotification(
          1,
          false,
          "We're pleased to inform you that a new customer has registered! Please follow up promptly by contacting.",
          "Just Now",
          true,
        )}

        {renderNotification(
          2,
          true,
          "Hello Sales Marketing Team,We have a special offer for our customers! Enjoy a 20% discount on selected..",
          "30 menit ago",
          false,
        )}

        {renderNotification(
          3,
          false,
          "Hello Sales Marketing Team, This is a reminder to achieve this month's sales target. Currently, we've....",
          "2 days ago",
          true,
        )}

        {renderNotification(
          4,
          true,
          "Hello Sales Marketing Team, We've received a product information request from a potential customer.",
          "5 days ago",
          false,
        )}

        {renderNotification(
          5,
          false,
          "Hello Sales Marketing Team, We've received a product information request from a potential customer.",
          "07 Feb, 2024",
          false,
        )}

        {renderNotification(
          6,
          false,
          "Hello Sales Marketing Team, A meeting or presentation has been scheduled with a customer/prospect.",
          "01 Feb, 2024",
          true,
        )}

        {renderNotification(
          7,
          false,
          "Hello Sales Marketing Team, This is a reminder to review the contract or proposal currently under....",
          "28 Jan, 2024",
          false,
        )}

        {renderNotification(
          8,
          false,
          "Hello Sales Marketing Team, It's time for a follow-up with a customer after their recent purchase/meeting.",
          "27 Jan, 2024",
          false,
        )}

        {renderNotification(
          9,
          false,
          "Hello Sales Marketing Team, We've received positive feedback/testimonial from a satisfied customer...",
          "26 Jan, 2024",
          true,
        )}

        {renderNotification(
          10,
          false,
          "Hello Sales Marketing Team, This is a reminder regarding an outstanding payment from a customer.....",
          "28 Jan, 2024",
          false,
        )}
      </div>
    </div>
    </>
  )
}


export default Notificationpage;