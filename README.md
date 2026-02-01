# De Rio Hostel Management System

A modern, full-stack hostel management system built with Laravel and React. This application streamlines booking management, room allocation, and administrative operations for hostels.

## Features

- **User Authentication & Authorization**
  - Secure login and registration
  - Two-factor authentication (2FA)
  - Email verification
  - Password reset functionality
  - Admin role management

- **Booking Management**
  - Create and manage room bookings
  - Real-time booking status updates
  - Admin approval workflow
  - Booking confirmation emails
  - Booking history and tracking

- **Room Management**
  - Multiple room types (Single, Double, Dorm)
  - Room availability management
  - Room details and pricing
  - Room-specific amenities

- **User Profiles**
  - User account settings
  - Profile information management
  - Email preferences

- **Admin Dashboard**
  - Booking approvals
  - User management
  - Admin signature functionality
  - System overview

## Screenshots

### User Interface
Here are some screenshots showcasing the De Rio Hostel Management System:

![Screenshot 1](screenshots/1Screenshot%202025-12-12%20181219.png)
![Screenshot 2](screenshots/Screenshot%202025-12-12%20181234.png)
![Screenshot 3](screenshots/Screenshot%202025-12-12%20182121.png)
![Screenshot 4](screenshots/Screenshot%202025-12-12%20182234.png)
![Screenshot 5](screenshots/Screenshot%202025-12-12%20182247.png)
![Screenshot 6](screenshots/Screenshot%202025-12-12%20182257.png)

## Tech Stack

### Backend
- **Laravel 11** - PHP web framework
- **PHP 8.2+** - Server-side language
- **MySQL/SQLite** - Database
- **Inertia.js** - Modern monolith
- **Laravel Fortify** - Authentication scaffolding

### Frontend
- **React 18+** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **Pest** - PHP testing framework

### Additional Tools
- **Composer** - PHP dependency manager
- **NPM** - Node.js package manager
- **Git** - Version control

## Installation

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 16+
- NPM or Yarn
- MySQL or SQLite

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/nanaasar/De-rio-Hostel-Management-System.git
   cd De-rio-Hostel-Management-System
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node dependencies**
   ```bash
   npm install
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env
   ```

5. **Generate application key**
   ```bash
   php artisan key:generate
   ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Build frontend assets**
   ```bash
   npm run build
   ```

8. **Start the development server**
   ```bash
   php artisan serve
   ```

9. **Start the Vite dev server (for hot reload)**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:8000`

## Usage

### Admin User
To create an admin user, run:
```bash
php artisan tinker
```

Then in the tinker shell:
```php
$user = User::first();
$user->is_admin = true;
$user->save();
```

### Running Tests
```bash
# Run all tests
php artisan test

# Run unit tests only
php artisan test --testsuite=Unit

# Run feature tests only
php artisan test --testsuite=Feature
```

## Project Structure

```
de-rio/
├── app/
│   ├── Actions/              # Action classes
│   ├── Http/
│   │   ├── Controllers/      # API & Web controllers
│   │   ├── Middleware/       # Custom middleware
│   │   └── Requests/         # Form request validation
│   ├── Mail/                 # Mailable classes
│   ├── Models/               # Eloquent models
│   └── Providers/            # Service providers
├── database/
│   ├── migrations/           # Database migrations
│   ├── factories/            # Model factories
│   └── seeders/              # Database seeders
├── resources/
│   ├── js/                   # React components & TypeScript
│   ├── css/                  # Tailwind CSS
│   └── views/                # Blade templates
├── routes/                   # Route definitions
├── storage/                  # File storage
├── tests/                    # Test files
│   ├── Feature/              # Feature tests
│   └── Unit/                 # Unit tests
├── config/                   # Configuration files
├── public/                   # Public assets
└── bootstrap/                # Bootstrap files
```

## Database Schema

### Key Tables
- **users** - User accounts with roles
- **bookings** - Room booking records
- **rooms** - Room information and details
- **migrations** - Database version history

### Key Models
- `User` - User authentication and profile
- `Booking` - Hostel room bookings
- `Room` - Available rooms and types

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /auth/forgot-password` - Password reset request

### Bookings
- `GET /api/bookings` - List user bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/{id}` - Get booking details
- `PUT /api/bookings/{id}` - Update booking
- `POST /api/bookings/{id}/approve` - Admin approve booking

### Rooms
- `GET /api/rooms` - List available rooms
- `GET /api/rooms/{id}` - Get room details

### Users
- `GET /api/user` - Get current user
- `PUT /api/user` - Update user profile
- `POST /api/user/password` - Change password

## Environment Variables

Key environment variables to configure:

```env
APP_NAME=DeRio
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=de_rio
DB_USERNAME=root
DB_PASSWORD=

MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=
MAIL_PASSWORD=
```

## Common Issues

### Database Errors
- Ensure MySQL/SQLite is running
- Check `DB_*` variables in `.env`
- Run `php artisan migrate:fresh` to reset migrations

### Permission Errors
- Run `chmod -R 755 storage bootstrap/cache`
- Ensure web server user has write permissions

### Frontend Not Loading
- Clear Node cache: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Rebuild: `npm run build`

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

The project includes comprehensive test coverage:

- **Unit Tests** - Core business logic testing
- **Feature Tests** - End-to-end workflow testing
- **Browser Tests** - Frontend validation

Run tests with:
```bash
php artisan test
```

## Performance & Optimization

- Database query optimization with Eloquent eager loading
- Frontend code splitting with Vite
- Caching strategies for frequent queries
- Asset minification in production

## Security

- CSRF protection enabled
- SQL injection prevention via Eloquent ORM
- XSS protection
- Password hashing with bcrypt
- Two-factor authentication support
- Email verification required

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review test cases for usage examples

## Authors

- **Nana Asar** - Initial development

## Changelog

### Version 1.0.0 (Current)
- Initial release
- User authentication system
- Booking management
- Room management
- Admin dashboard
- Email notifications
- Two-factor authentication

---

**Last Updated:** February 1, 2026

For more information, visit the [GitHub Repository](https://github.com/nanaasar/De-rio-Hostel-Management-System)
