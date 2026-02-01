import BookingController from './BookingController'
import RoomController from './RoomController'
import Settings from './Settings'
const Controllers = {
    BookingController: Object.assign(BookingController, BookingController),
RoomController: Object.assign(RoomController, RoomController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers