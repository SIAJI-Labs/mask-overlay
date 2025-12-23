"use client";

/**
 * Template Manager component for loading, saving, updating, renaming, and deleting templates
 */

import React, { useState } from "react";
import { Bookmark, Trash2, Star, Plus, Pencil, Save, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Template } from "@/types/templates";
import type { WatermarkSettings } from "@/types/files";

interface TemplateManagerProps {
    templates: Template[];
    currentTemplateId?: string | null;
    hasChanges?: boolean;
    onLoad: (settings: WatermarkSettings, templateId: string) => void;
    onSave: (name: string) => void;
    onUpdate: (id: string) => void;
    onDiscard: () => void;
    onRename: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
}

export function TemplateManager({
    templates,
    currentTemplateId,
    hasChanges = false,
    onLoad,
    onSave,
    onUpdate,
    onDiscard,
    onRename,
    onDelete,
}: TemplateManagerProps) {
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [renameTemplateId, setRenameTemplateId] = useState<string | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    const handleSave = () => {
        if (templateName.trim()) {
            onSave(templateName.trim());
            setTemplateName("");
            setSaveDialogOpen(false);
        }
    };

    const handleRename = () => {
        if (renameTemplateId && templateName.trim()) {
            onRename(renameTemplateId, templateName.trim());
            setTemplateName("");
            setRenameTemplateId(null);
            setRenameDialogOpen(false);
        }
    };

    const openRenameDialog = (template: Template) => {
        setRenameTemplateId(template.id);
        setTemplateName(template.name);
        setRenameDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        onDelete(id);
        setDeleteConfirmId(null);
    };

    const builtInTemplates = templates.filter(t => t.isBuiltIn);
    const customTemplates = templates.filter(t => !t.isBuiltIn);

    // Find current template name if one is loaded
    const currentTemplate = currentTemplateId
        ? templates.find(t => t.id === currentTemplateId)
        : null;
    const isCustomTemplateLoaded = currentTemplate && !currentTemplate.isBuiltIn;

    return (
        <>
            <div className="flex flex-wrap gap-2">
                {/* Load Template Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 min-w-0 max-w-full"
                            title={currentTemplate ? currentTemplate.name : "Select a template"}
                        >
                            <Bookmark className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">
                                {currentTemplate ? currentTemplate.name : "Templates"}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                        <DropdownMenuLabel>Built-in</DropdownMenuLabel>
                        {builtInTemplates.map((template) => (
                            <DropdownMenuItem
                                key={template.id}
                                onClick={() => onLoad(template.settings, template.id)}
                                className={cn(
                                    "flex items-center justify-between",
                                    currentTemplateId === template.id && "bg-accent"
                                )}
                            >
                                <span className="flex items-center gap-2">
                                    <Star className="w-3 h-3 text-amber-500" />
                                    {template.name}
                                </span>
                            </DropdownMenuItem>
                        ))}

                        {customTemplates.length > 0 && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Custom</DropdownMenuLabel>
                                {customTemplates.map((template) => (
                                    <DropdownMenuItem
                                        key={template.id}
                                        className={cn(
                                            "flex items-center justify-between group",
                                            currentTemplateId === template.id && "bg-accent"
                                        )}
                                    >
                                        <span
                                            className="flex-1 cursor-pointer"
                                            onClick={() => onLoad(template.settings, template.id)}
                                        >
                                            {template.name}
                                        </span>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openRenameDialog(template);
                                                }}
                                                className="p-1 rounded hover:bg-muted"
                                                title="Rename template"
                                            >
                                                <Pencil className="w-3 h-3" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDeleteConfirmId(template.id);
                                                }}
                                                className="p-1 rounded hover:bg-destructive/20 text-destructive"
                                                title="Delete template"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </>
                        )}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSaveDialogOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Save Current as Template
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Update/Discard buttons - visible when a custom template is loaded */}
                {isCustomTemplateLoaded && (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onDiscard}
                            disabled={!hasChanges}
                            title={hasChanges
                                ? "Discard changes and revert to template"
                                : "No changes to discard"
                            }
                        >
                            <Undo2 className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => currentTemplateId && onUpdate(currentTemplateId)}
                            disabled={!hasChanges}
                            title={hasChanges
                                ? `Save changes to "${currentTemplate.name}"`
                                : "No changes to save"
                            }
                        >
                            <Save className="w-4 h-4" />
                        </Button>
                    </>
                )}
            </div>

            {/* Save Template Dialog */}
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Save Template</DialogTitle>
                        <DialogDescription>
                            Save your current watermark settings as a reusable template.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="template-name">Template Name</Label>
                        <Input
                            id="template-name"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            placeholder="My Template"
                            className="mt-2"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSave();
                            }}
                            autoFocus
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={!templateName.trim()}>
                            Save Template
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Rename Template Dialog */}
            <Dialog open={renameDialogOpen} onOpenChange={(open) => {
                setRenameDialogOpen(open);
                if (!open) {
                    setTemplateName("");
                    setRenameTemplateId(null);
                }
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename Template</DialogTitle>
                        <DialogDescription>
                            Enter a new name for this template.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="rename-template-name">Template Name</Label>
                        <Input
                            id="rename-template-name"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            placeholder="My Template"
                            className="mt-2"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleRename();
                            }}
                            autoFocus
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleRename} disabled={!templateName.trim()}>
                            Rename
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Template?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. The template will be permanently deleted.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
