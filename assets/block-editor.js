(function(wp) {
    const { registerPlugin } = wp.plugins;
    const { PluginDocumentSettingPanel } = wp.editPost;
    const { PanelRow, CheckboxControl } = wp.components;
    const { useSelect, useDispatch } = wp.data;
    const { createElement: el } = wp.element;

    // Hide classic meta box and auto-generated meta panels
    wp.domReady(function() {
        // Hide classic meta box
        const classicMetaBox = document.getElementById('vvc-visibility-settings');
        if (classicMetaBox) {
            classicMetaBox.style.display = 'none';
        }
        
        // Function to hide auto-generated meta panels
        function hideAutoMetaPanels() {
            // Look for panels containing _show_to_visitor
            const autoMetaPanels = document.querySelectorAll('[data-label="_show_to_visitor"], .components-panel__body:has([data-label="_show_to_visitor"])');
            autoMetaPanels.forEach(panel => {
                const parentPanel = panel.closest('.components-panel__body');
                if (parentPanel && !parentPanel.classList.contains('visitor-visibility-control-panel')) {
                    parentPanel.style.display = 'none';
                }
            });
            
            // Also check for panels with "Custom Fields" or "Additional" titles that might contain our meta
            const genericPanels = document.querySelectorAll('.components-panel__body');
            genericPanels.forEach(panel => {
                const title = panel.querySelector('.components-panel__body-title');
                if (title && (title.textContent.includes('Custom Fields') || title.textContent.includes('Additional'))) {
                    const metaControls = panel.querySelectorAll('[id*="_show_to_visitor"], [name*="_show_to_visitor"]');
                    if (metaControls.length > 0 && !panel.classList.contains('visitor-visibility-control-panel')) {
                        panel.style.display = 'none';
                    }
                }
            });
        }
        
        // Hide immediately
        hideAutoMetaPanels();
        
        // Also hide after a short delay to catch dynamically loaded panels
        setTimeout(hideAutoMetaPanels, 500);
        setTimeout(hideAutoMetaPanels, 1000);
        
        // Watch for DOM changes to hide any panels that appear later
        const observer = new MutationObserver(hideAutoMetaPanels);
        observer.observe(document.body, { childList: true, subtree: true });
    });

    // Component for the visibility control
    const VisibilityControl = () => {
        const postType = useSelect((select) => {
            return select('core/editor').getCurrentPostType();
        }, []);

        const showToVisitor = useSelect((select) => {
            const meta = select('core/editor').getEditedPostAttribute('meta');
            return meta && meta._show_to_visitor !== undefined ? meta._show_to_visitor : false;
        }, []);

        const { editPost } = useDispatch('core/editor');

        // Only show for posts and pages
        if (!['post', 'page'].includes(postType)) {
            return null;
        }

        const handleToggle = (value) => {
            editPost({
                meta: {
                    _show_to_visitor: value
                }
            });
        };

        return el(
            PanelRow,
            {},
            el(CheckboxControl, {
                label: vvcData.strings.label,
                help: vvcData.strings.help,
                checked: showToVisitor,
                onChange: handleToggle
            })
        );
    };

    // Register the plugin
    registerPlugin('visitor-visibility-control', {
        render: () => {
            return el(
                PluginDocumentSettingPanel,
                {
                    name: 'visitor-visibility-control',
                    title: vvcData.strings.title,
                    className: 'visitor-visibility-control-panel'
                },
                el(VisibilityControl)
            );
        }
    });

})(window.wp);
