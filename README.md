# Visitor Visibility Control

A WordPress plugin that adds granular content visibility controls, allowing administrators to hide specific posts and pages from visitors while keeping them accessible to logged-in users.

## 🚀 Features

### 🎯 Core Functionality
- **Editor Integration**: Seamless checkbox in both Gutenberg and Classic editor sidebars
- **Default Hidden**: All content is hidden by default for enhanced privacy
- **Frontend Protection**: Hidden content returns proper 404 pages for visitors
- **Admin Access**: Logged-in users with edit capabilities can always see all content

### 📋 Content Management
- **Bulk Operations**: Change visibility for multiple posts/pages via bulk edit
- **Quick Edit**: Modify visibility directly from post lists
- **Admin Overview**: Visibility status column in admin post/page lists
- **Hierarchy Support**: Parent page visibility affects child page accessibility

### 🎨 Navigation Control
- **Menu Integration**: Automatically excludes hidden content from all navigation menus
- **Multiple Menu Types**: Works with WordPress menus, wp_list_pages, wp_page_menu
- **Fallback CSS**: Ensures comprehensive menu hiding across all themes

### ⚙️ Technical Features
- **WordPress.org Ready**: Compliant with all WordPress.org plugin directory standards
- **Security First**: Proper nonce verification, capability checks, input sanitization
- **Performance Optimized**: Efficient queries with appropriate caching
- **Clean Uninstall**: Removes all plugin data when uninstalled

## 📋 Requirements

- **WordPress**: 5.0 or higher
- **PHP**: 7.4 or higher
- **Browsers**: Modern browsers supporting ES6+
- **Themes**: Compatible with all WordPress themes
- **Editors**: Full support for both Gutenberg and Classic editors

## 🛠 Installation

### Manual Installation
1. Download the plugin files
2. Upload to `/wp-content/plugins/visitor-visibility-control/`
3. Activate through WordPress admin 'Plugins' screen
4. Start using the "Show to visitor" checkbox in editors

### WordPress.org Installation (Coming Soon)
1. Go to Plugins → Add New
2. Search for "Visitor Visibility Control"
3. Install and activate

## 📖 Usage

### Basic Usage
1. **Edit Content**: Open any post or page for editing
2. **Find Settings**: Look for "Visibility Settings" panel in the right sidebar
3. **Set Visibility**: Check "Show to visitor" to make content visible to non-logged-in users
4. **Save**: Update/publish your content

### Advanced Features

#### Bulk Operations
1. Go to Posts → All Posts (or Pages → All Pages)
2. Select multiple items using checkboxes
3. Choose "Edit" from Bulk Actions dropdown
4. Set visibility for all selected items at once

#### Quick Edit
1. In post/page lists, hover over any item
2. Click "Quick Edit"
3. Toggle visibility setting
4. Update immediately

## 🏗 Architecture

### File Structure
```
visitor-visibility-control/
├── visitor-visibility-control.php    # Main plugin file
├── readme.txt                        # WordPress.org readme
├── uninstall.php                    # Clean uninstall script
├── assets/
│   ├── block-editor.js              # Gutenberg integration
│   ├── bulk-edit.js                 # Bulk/quick edit functionality
│   ├── admin-style.css              # Admin interface styling
│   └── frontend-style.css           # Frontend fallback styles
└── languages/                       # Translation files
```

### Core Components

#### 1. Meta Field Registration
- **Field**: `_show_to_visitor` (boolean)
- **Default**: `false` (hidden)
- **REST API**: Enabled for Gutenberg integration
- **Permissions**: Edit capability required

#### 2. Editor Integration
- **Gutenberg**: Custom PluginDocumentSettingPanel
- **Classic Editor**: Traditional meta box
- **Conflict Resolution**: Prevents duplicate panels

#### 3. Frontend Filtering
- **Query Modification**: Filters post queries for visitors
- **Menu Filtering**: Multiple layers for comprehensive coverage
- **404 Handling**: Proper WordPress 404 pages for hidden content

#### 4. Admin Interface
- **Bulk Edit**: AJAX-powered bulk operations
- **Quick Edit**: Inline editing support
- **Admin Columns**: Visibility status indicators

## 🔧 Technical Implementation

### Database Schema
```sql
-- Post meta storage
wp_postmeta:
  meta_key: '_show_to_visitor'
  meta_value: '0' (hidden) or '1' (visible)
```

### Hooks and Filters Used
```php
// Admin hooks
add_action('enqueue_block_editor_assets', ...)
add_action('add_meta_boxes', ...)
add_action('save_post', ...)

// Frontend hooks
add_action('pre_get_posts', ...)
add_filter('wp_get_nav_menu_items', ...)
add_filter('wp_list_pages_excludes', ...)
add_action('template_redirect', ...)
```

### Security Measures
- **Nonce Verification**: All form submissions protected
- **Capability Checks**: User permissions validated
- **Input Sanitization**: All user input properly sanitized
- **Output Escaping**: All output properly escaped

## 🧪 Testing

### Manual Testing Checklist
- [ ] Create post/page and test visibility toggle
- [ ] Verify logged-out users can't see hidden content
- [ ] Test bulk edit functionality
- [ ] Check quick edit operations
- [ ] Verify menu filtering works
- [ ] Test parent-child page scenarios
- [ ] Confirm 404 pages work correctly
- [ ] Test plugin activation/deactivation
- [ ] Verify clean uninstall

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### WordPress Testing
- [ ] WordPress 5.0 - 6.8
- [ ] Gutenberg editor
- [ ] Classic editor
- [ ] Various themes
- [ ] Multisite compatibility

## 🚨 Known Issues & Limitations

### Resolved Issues
- ✅ Duplicate panels in Gutenberg editor
- ✅ Save button not enabling on changes
- ✅ Menu filtering edge cases
- ✅ Parent-child page logic

### Current Limitations
- Plugin Check performance warnings (expected for meta queries)
- Requires JavaScript for optimal Gutenberg experience

## 🤝 Contributing

### Development Setup
1. Clone repository to WordPress plugins directory
2. Ensure WordPress development environment
3. Install WordPress Coding Standards
4. Run `composer install` (if using Composer)

### Coding Standards
- Follow WordPress Coding Standards
- Use proper PHPDoc comments
- Maintain security best practices
- Test across multiple WordPress versions

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Ensure coding standards compliance
5. Submit pull request with description

## 📄 License

This plugin is licensed under the GPL v2 or later.

## 🆘 Support

### Documentation
- [Installation Guide](INSTALLATION.md)
- [Enhanced Features](ENHANCED-FEATURES.md)
- [Parent-Child Behavior](PARENT-CHILD-BEHAVIOR.md)
- [Performance Notes](PERFORMANCE-WARNINGS.md)

### Issues
- Report bugs via GitHub Issues
- Feature requests welcome
- Include WordPress/PHP versions in reports

## 🔄 Changelog

### 1.0.0 (Current)
- Initial release
- Gutenberg and Classic editor support
- Bulk and quick edit functionality
- Comprehensive menu filtering
- WordPress.org compliance
- Clean uninstall process

---

**Made with ❤️ for the WordPress community**
