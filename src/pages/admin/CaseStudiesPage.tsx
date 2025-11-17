import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUpload from '../../components/admin/ImageUpload';
import RichTextEditor from '../../components/admin/RichTextEditor';
import SocialShare from '../../components/admin/SocialShare';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  industry: string;
  status: string;
  slug: string | null;
  cover_image_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setCaseStudies(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;

    const { error } = await supabase
      .from('case_studies')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchCaseStudies();
    }
  };

  const handleStatusToggle = async (caseStudy: CaseStudy) => {
    const newStatus = caseStudy.status === 'published' ? 'draft' : 'published';
    const { error } = await supabase
      .from('case_studies')
      .update({ status: newStatus })
      .eq('id', caseStudy.id);

    if (!error) {
      fetchCaseStudies();
    }
  };

  const filteredCaseStudies = caseStudies.filter(caseStudy => {
    const matchesSearch = caseStudy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         caseStudy.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || caseStudy.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (caseStudy: CaseStudy) => {
    setEditingCaseStudy(caseStudy);
    setShowEditor(true);
  };

  const handleCreate = () => {
    setEditingCaseStudy(null);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingCaseStudy(null);
    fetchCaseStudies();
  };

  if (showEditor) {
    return (
      <CaseStudyEditor
        caseStudy={editingCaseStudy}
        onClose={handleCloseEditor}
      />
    );
  }

  return (
    <AdminLayout currentPage="case-studies">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>
              Case Studies
            </h1>
            <p className="text-gray-600">
              Manage client success stories and case studies
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-[#FF8A00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg"
          >
            <Plus size={20} />
            New Case Study
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading case studies...</p>
        </div>
      ) : filteredCaseStudies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No case studies found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#001641]">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#001641]">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#001641]">Industry</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#001641]">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-[#001641]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCaseStudies.map((caseStudy) => (
                <tr key={caseStudy.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[#001641]">{caseStudy.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{caseStudy.challenge.substring(0, 100)}...</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{caseStudy.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{caseStudy.industry}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      caseStudy.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : caseStudy.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {caseStudy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleStatusToggle(caseStudy)}
                        className="p-2 text-gray-600 hover:text-[#FF8A00] hover:bg-orange-50 rounded-lg transition-colors"
                        title={caseStudy.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        {caseStudy.status === 'published' ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={() => handleEdit(caseStudy)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(caseStudy.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

interface CaseStudyEditorProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

function CaseStudyEditor({ caseStudy, onClose }: CaseStudyEditorProps) {
  const [formData, setFormData] = useState({
    title: caseStudy?.title || '',
    client: caseStudy?.client || '',
    challenge: caseStudy?.challenge || '',
    solution: caseStudy?.solution || '',
    results: caseStudy?.results || '',
    industry: caseStudy?.industry || '',
    status: caseStudy?.status || 'draft',
    slug: caseStudy?.slug || '',
    cover_image_url: caseStudy?.cover_image_url || null,
    display_order: caseStudy?.display_order || 0,
  });
  const [saving, setSaving] = useState(false);
  const caseStudyUrl = caseStudy ? `${window.location.origin}/insights/${caseStudy.slug || caseStudy.id}` : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const caseStudyData = {
      ...formData,
      slug: formData.slug || null,
    };

    let error;
    if (caseStudy) {
      ({ error } = await supabase
        .from('case_studies')
        .update(caseStudyData)
        .eq('id', caseStudy.id));
    } else {
      ({ error } = await supabase
        .from('case_studies')
        .insert([caseStudyData]));
    }

    setSaving(false);

    if (!error) {
      onClose();
    } else {
      alert('Error saving case study: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>
              {caseStudy ? 'Edit Case Study' : 'Create New Case Study'}
            </h1>
            <p className="text-gray-600">
              Fill in the details below to {caseStudy ? 'update' : 'create'} your case study
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <ImageUpload
              currentImageUrl={formData.cover_image_url}
              onImageUploaded={(url) => setFormData({ ...formData, cover_image_url: url })}
              onImageRemoved={() => setFormData({ ...formData, cover_image_url: null })}
            />

            <div>
              <label className="block text-sm font-semibold text-[#001641] mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#001641] mb-2">
                  Client *
                </label>
                <input
                  type="text"
                  required
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001641] mb-2">
                  Industry *
                </label>
                <input
                  type="text"
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g., Cryptocurrency Exchange, Traditional Finance"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#001641] mb-2">
                Challenge *
              </label>
              <RichTextEditor
                value={formData.challenge}
                onChange={(value) => setFormData({ ...formData, challenge: value })}
                placeholder="Describe the client's challenge or problem..."
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#001641] mb-2">
                Solution *
              </label>
              <RichTextEditor
                value={formData.solution}
                onChange={(value) => setFormData({ ...formData, solution: value })}
                placeholder="Describe the solution provided..."
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#001641] mb-2">
                Results *
              </label>
              <RichTextEditor
                value={formData.results}
                onChange={(value) => setFormData({ ...formData, results: value })}
                placeholder="Describe the outcomes and results achieved..."
                rows={6}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#001641] mb-2">
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001641] mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#001641] mb-2">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="case-study-url-slug"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              />
            </div>

            {caseStudy && caseStudy.status === 'published' && (
              <div className="pt-6 border-t border-gray-200">
                <label className="block text-sm font-semibold text-[#001641] mb-3">
                  Share Case Study
                </label>
                <SocialShare
                  title={caseStudy.title}
                  url={caseStudyUrl}
                />
              </div>
            )}

            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#FF8A00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : caseStudy ? 'Update Case Study' : 'Create Case Study'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
