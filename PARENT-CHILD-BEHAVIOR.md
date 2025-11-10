# Parent/Child Page Behavior - Visitor Visibility Control

## 🔗 Hierarchical Page Structure Behavior

### Current Implementation Logic:

The plugin now includes intelligent handling of parent-child page relationships to ensure logical access control.

## 📋 Scenarios & Outcomes

### Scenario 1: Parent Hidden ❌, Child Visible ✅
**Result**: **Child is NOT accessible** 
- **Why**: If a parent page is hidden, it doesn't make sense for child pages to be accessible
- **Behavior**: Child page returns 404, even if checked as "Show to visitor"
- **Logic**: Protects against orphaned content that would be confusing to visitors

### Scenario 2: Parent Visible ✅, Child Hidden ❌  
**Result**: **Child is NOT accessible**
- **Why**: Child specifically set to hidden
- **Behavior**: Parent accessible, child returns 404
- **Logic**: Standard behavior - child visibility controlled independently

### Scenario 3: Parent Visible ✅, Child Visible ✅
**Result**: **Both accessible**
- **Why**: Both explicitly set to visible
- **Behavior**: Normal access to both pages
- **Logic**: Standard behavior - both pages work as expected

### Scenario 4: Parent Hidden ❌, Child Hidden ❌
**Result**: **Neither accessible**
- **Why**: Both explicitly hidden
- **Behavior**: Both return 404
- **Logic**: Standard behavior - both hidden

## 🔄 Multi-Level Hierarchy

For deeper hierarchical structures:
```
Grandparent Page
└── Parent Page  
    └── Child Page
        └── Grandchild Page
```

### Rules Applied:
1. **Any hidden ancestor makes all descendants inaccessible**
2. **All ancestors must be visible for a page to be accessible**
3. **Checking is done recursively up the hierarchy**

### Examples:

#### Example 1:
- Grandparent: ✅ Visible
- Parent: ❌ Hidden  
- Child: ✅ Visible
- Grandchild: ✅ Visible

**Result**: Only Grandparent accessible, all others return 404

#### Example 2:
- Grandparent: ✅ Visible
- Parent: ✅ Visible
- Child: ❌ Hidden
- Grandchild: ✅ Visible  

**Result**: Grandparent and Parent accessible, Child and Grandchild return 404

## 🎯 Navigation Menu Behavior

### Menu Item Filtering:
- **Hidden parents**: Removed from menus (along with all children)
- **Visible parents with hidden children**: Parent shown, children filtered out
- **Nested menu structures**: Automatically cleaned up to prevent broken navigation

### Auto-Generated Menus:
- Page lists (wp_list_pages) automatically exclude hidden pages
- Breadcrumbs will skip hidden parents
- Site maps exclude hidden hierarchies

## 🛠️ Technical Implementation

### Functions Added:
```php
// Main access check
restrict_hidden_post_access()

// Recursive parent checking  
check_parent_page_access($post)
```

### Database Queries:
- No additional database overhead
- Uses existing post hierarchy structure
- Efficient recursive checking with early exit

## 🎮 Admin Interface Implications

### Bulk Edit Considerations:
When using bulk edit on hierarchical pages:

1. **Hiding a parent** → Automatically makes children inaccessible (even if children are marked visible)
2. **Showing a parent** → Children accessibility depends on their individual settings
3. **Bulk operations** → Apply to selected pages only, hierarchy logic applied at frontend

### Quick Edit:
- Shows current page setting only
- Doesn't indicate parent dependency
- Visual warning could be added in future versions

## ⚠️ Important Notes

### For Content Editors:
1. **Check parent pages first** before wondering why child pages aren't accessible
2. **Use hierarchical bulk edit carefully** - consider impact on child pages
3. **Test navigation** after changing parent page visibility

### For Developers:
1. **Posts vs Pages**: This hierarchy logic only applies to pages (posts don't have hierarchy by default)
2. **Custom Post Types**: Would need additional configuration for hierarchical custom post types
3. **Performance**: Recursive checking is optimized but consider caching for very deep hierarchies

## 🔧 Customization Options

### Disable Hierarchy Checking:
If you want child pages to be accessible even when parents are hidden, you can add this to your theme's functions.php:

```php
add_filter('vvc_enforce_parent_visibility', '__return_false');
```

### Custom Hierarchy Logic:
Developers can hook into the parent checking with:

```php
add_filter('vvc_parent_accessible', function($accessible, $parent_post, $child_post) {
    // Custom logic here
    return $accessible;
}, 10, 3);
```

## 📊 Summary Table

| Parent Status | Child Status | Child Accessible? | Reason |
|---------------|--------------|-------------------|---------|
| ❌ Hidden | ❌ Hidden | ❌ No | Both hidden |
| ❌ Hidden | ✅ Visible | ❌ No | Parent blocks access |
| ✅ Visible | ❌ Hidden | ❌ No | Child explicitly hidden |
| ✅ Visible | ✅ Visible | ✅ Yes | Both visible |

This ensures a logical, predictable experience for both content managers and website visitors.
