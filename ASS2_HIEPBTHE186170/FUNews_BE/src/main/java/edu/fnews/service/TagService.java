package edu.fnews.service;

import edu.fnews.dto.request.TagRequest;
import edu.fnews.dto.response.TagResponse;
import edu.fnews.entity.Tag;
import edu.fnews.exception.DuplicateResourceException;
import edu.fnews.exception.ResourceNotFoundException;
import edu.fnews.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    public List<TagResponse> getAllTags() {
        return tagRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public TagResponse getTagById(Integer id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: " + id));
        return toResponse(tag);
    }

    public TagResponse createTag(TagRequest request) {
        if (tagRepository.existsByTagNameIgnoreCase(request.getTagName())) {
            throw new DuplicateResourceException("Tag already exists: " + request.getTagName());
        }
        Tag tag = Tag.builder()
                .tagName(request.getTagName())
                .tagNote(request.getTagNote())
                .build();
        Tag saved = tagRepository.save(tag);
        return toResponse(saved);
    }

    public TagResponse updateTag(Integer id, TagRequest request) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: " + id));
        tag.setTagName(request.getTagName());
        tag.setTagNote(request.getTagNote());
        Tag saved = tagRepository.save(tag);
        return toResponse(saved);
    }

    public void deleteTag(Integer id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: " + id));
        tagRepository.delete(tag);
    }

    private TagResponse toResponse(Tag tag) {
        return TagResponse.builder()
                .tagId(tag.getTagId())
                .tagName(tag.getTagName())
                .tagNote(tag.getTagNote())
                .build();
    }
}
