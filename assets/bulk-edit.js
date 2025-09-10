jQuery(document).ready(function($) {
    
    // Handle bulk edit form submission
    $(document).on('click', '#bulk_edit', function() {
        
        // Get the selected post IDs
        var post_ids = [];
        $('#the-list').find('tbody th.check-column input[type="checkbox"]:checked').each(function() {
            post_ids.push($(this).val());
        });
        
        // Get the visibility setting
        var visibility = $('select[name="vvc_bulk_edit_visitor_visibility"]').val();
        
        // Only proceed if posts are selected and visibility change is requested
        if (post_ids.length > 0 && visibility !== '-1') {
            
            // Show loading indicator
            var $button = $(this);
            var originalText = $button.val();
            $button.val('Updating...');
            $button.prop('disabled', true);
            
            // Send AJAX request
            $.ajax({
                url: vvcBulkEdit.ajax_url,
                type: 'POST',
                data: {
                    action: 'save_bulk_edit_visitor_visibility',
                    post_ids: post_ids,
                    visibility: visibility,
                    nonce: vvcBulkEdit.nonce
                },
                success: function(response) {
                    // Restore button state
                    $button.val(originalText);
                    $button.prop('disabled', false);
                    
                    // Reload the page to show updated values
                    location.reload();
                },
                error: function() {
                    // Restore button state
                    $button.val(originalText);
                    $button.prop('disabled', false);
                    
                    alert('Error updating visitor visibility settings.');
                }
            });
        }
    });
    
    // Handle quick edit - populate current value
    $(document).on('click', '.editinline', function() {
        var post_id = $(this).closest('tr').attr('id').replace('post-', '');
        var $visibilityColumn = $('#post-' + post_id + ' .column-visitor_visibility span');
        
        // Check visibility status from data attribute (more reliable)
        var isVisible = false;
        if ($visibilityColumn.length > 0) {
            var visibilityData = $visibilityColumn.attr('data-visibility');
            isVisible = visibilityData === '1';
        }
        
        // Wait for the quick edit row to be fully rendered
        setTimeout(function() {
            var $row = $('#edit-' + post_id);
            var $checkbox = $row.find('input[name="vvc_show_to_visitor"]');
            if ($checkbox.length > 0) {
                $checkbox.prop('checked', isVisible);
                console.log('Quick edit: Post ' + post_id + ' visibility set to ' + isVisible);
            } else {
                console.log('Quick edit checkbox not found for post ' + post_id);
            }
        }, 200);
    });
    
    // Handle inline edit save - just for logging
    $(document).on('click', '.save-post', function() {
        var post_id = $(this).closest('tr').attr('id').replace('edit-', '');
        var $checkbox = $(this).closest('tr').find('input[name="vvc_show_to_visitor"]');
        var isChecked = $checkbox.length > 0 ? $checkbox.prop('checked') : false;
        
        console.log('Quick edit save for post ' + post_id + ', visibility: ' + isChecked);
    });
});
