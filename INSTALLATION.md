# Visitor Visibility Control - Installation & Usage Guide

## Quick Installation

1. **Upload Plugin**
   - Copy the entire `visitor-visibility-control` folder to `/wp-content/plugins/`
   - Or upload the `visitor-visibility-control.zip` file via WordPress Admin → Plugins → Add New → Upload Plugin

2. **Activate Plugin**
   - Go to WordPress Admin → Plugins
   - Find "Visitor Visibility Control" and click "Activate"

3. **Start Using**
   - Edit any post or page
   - Look for "Visibility Settings" in the right sidebar
   - Toggle the "Show to visitor" checkbox as needed

## Features Overview

### ✅ What This Plugin Does

- **Adds Editor Control**: Checkbox in post/page editor sidebar
- **Hides Content**: Unchecked posts/pages are invisible to visitors
- **Menu Integration**: Hidden content won't appear in navigation menus
- **404 Protection**: Direct access to hidden content returns 404
- **Admin Override**: Logged-in editors can always see all content
- **Default Hidden**: All content is hidden by default
- **Bulk Operations**: Change multiple posts/pages at once
- **Quick Edit**: Fast editing from post list view
- **Hierarchy Support**: Parent page visibility affects child pages

### ❌ What This Plugin Doesn't Do

- **Password Protection**: This isn't a password-protected content system
- **User Role Control**: It only distinguishes between visitors and editors
- **Scheduled Publishing**: Use WordPress's built-in scheduling instead
- **Content Replacement**: Hidden content returns 404, not placeholder text

## Usage Instructions

### For Content Editors

#### Individual Posts/Pages:
1. **Edit Post/Page**: Go to Posts → Edit or Pages → Edit
2. **Find Visibility Settings**: Look in the right sidebar for "Visibility Settings"
3. **Toggle Checkbox**: 
   - ❌ Unchecked = Hidden from visitors (default)
   - ✅ Checked = Visible to visitors
4. **Save/Update**: Click "Update" or "Publish" to save changes

#### Bulk Operations:
1. **Select Multiple**: Go to Posts or Pages list, check multiple items
2. **Choose Bulk Actions**: Select "Edit" from bulk actions dropdown
3. **Click Apply**: This opens the bulk edit interface
4. **Find Visitor Visibility**: Look for the "Visitor Visibility" dropdown
5. **Choose Action**: 
   - "Show to visitors" = Make all selected items visible
   - "Hide from visitors" = Hide all selected items
   - "— No Change —" = Leave current settings
6. **Update**: Click "Update" to apply changes

#### Quick Edit:
1. **Hover Over Post**: In the post/page list, hover over any item
2. **Click Quick Edit**: Click the "Quick Edit" link that appears
3. **Find Checkbox**: Look for "Show to visitor" checkbox
4. **Toggle Setting**: Check/uncheck as needed
5. **Update**: Click "Update" to save

### For Gutenberg (Block Editor)

The "Visibility Settings" panel appears in the Document sidebar (right panel) with:
- Clear checkbox control
- Helpful description text
- Real-time preview updates

### For Classic Editor

A meta box titled "Visibility Settings" appears in the sidebar with:
- Simple checkbox interface
- Description of functionality

### Admin Post/Page Lists

A new "Visitor Visibility" column shows:
- ✅ **Visible** (green checkmark)
- ❌ **Hidden** (red X)

## Technical Details

### Post Meta Storage
- **Meta Key**: `_show_to_visitor`
- **Data Type**: Boolean (true/false)
- **Default Value**: `false` (hidden)

### Who Can See Hidden Content
- **WordPress Administrators**: Always visible
- **Editors**: Always visible  
- **Authors**: Always visible (for their own content)
- **Contributors**: Always visible (for their own content)
- **Visitors**: Cannot see hidden content

### Where Hidden Content is Excluded
- **Homepage/Archive Pages**: Won't appear in post listings
- **Navigation Menus**: Automatically removed from menus
- **Search Results**: Won't appear in search
- **RSS Feeds**: Excluded from feeds
- **Sitemaps**: Not included in XML sitemaps

## Troubleshooting

### Plugin Not Working?

1. **Check Plugin Activation**: Ensure the plugin is activated in WordPress Admin
2. **Clear Cache**: If using caching plugins, clear all caches
3. **Check User Permissions**: Make sure you're logged in as an administrator
4. **Browser Refresh**: Hard refresh your browser (Ctrl+F5)

### Checkbox Not Appearing?

1. **Editor Type**: Works in both Gutenberg and Classic editor
2. **Post Types**: Only appears for posts and pages (not custom post types)
3. **Permissions**: Must have edit permissions for the content type
4. **JavaScript Errors**: Check browser console for JavaScript errors

### Content Still Visible?

1. **Cache Issues**: Clear all caching (browser, WordPress, CDN)
2. **User Status**: Make sure you're viewing as a visitor (logged out)
3. **Meta Value**: Check if the meta value was saved correctly
5. **Theme Compatibility**: Some themes may have custom query logic

## Development Notes

### For Developers

The plugin uses standard WordPress hooks and practices:

```php
// Check if post should be visible to visitors
$show_to_visitor = get_post_meta($post_id, '_show_to_visitor', true);
if ($show_to_visitor === '') $show_to_visitor = true; // Default to visible

// Modify queries to exclude hidden posts
add_action('pre_get_posts', 'your_custom_function');

// Filter navigation menus
add_filter('wp_get_nav_menu_items', 'your_custom_function');
```

### Extending the Plugin

You can extend functionality by hooking into:
- `vvc_before_visibility_check` (action)
- `vvc_post_visibility_updated` (action)
- `vvc_should_hide_post` (filter)

## Support

For issues or questions:
1. Check this documentation first
2. Test with default WordPress theme
3. Deactivate other plugins to test for conflicts
4. Contact plugin author with specific details

## Version History

- **1.0.0**: Initial release with full Gutenberg and Classic editor support
